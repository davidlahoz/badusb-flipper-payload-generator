/* ============================================================
   FZ.BadUSB — payload generator script
   ============================================================ */

const output = document.getElementById('output');

const bind = (id, ev, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(ev, fn);
};

bind('save-btn', 'click', saveOutput);
bind('add-remark-btn', 'click', addRemark);
bind('add-string-btn', 'click', addString);
bind('add-altcode-btn', 'click', addAltCode);
bind('add-delay-btn', 'click', addDelay);
bind('add-default-delay-btn', 'click', addDefaultDelay);
bind('add-button-press-btn', 'click', addWaitForButtonPress);

bind('bulkStringBtn', 'click', addBulkStrings);
bind('bulkAltcodeBtn', 'click', addBulkAltcodes);
bind('bulkRemarkBtn', 'click', addBulkRemarks);
bind('bulkAltcharBtn', 'click', addBulkAltchars);

bind('saveAlternateBtn', 'click', copyToClipboard);
bind('clearBtn', 'click', clearPayload);

function addCommand(command) {
    output.value += `${command}\n`;
    onPayloadChanged(command);
}

function addRemark() {
    const input = document.getElementById('remark-input').value.trim();
    if (input) addCommand(`REM ${input}`);
    document.getElementById('remark-input').value = '';
}

function addString() {
    const input = document.getElementById('string-input').value.trim();
    if (input) addCommand(`STRING ${input}`);
    document.getElementById('string-input').value = '';
}

function addAltCode() {
    const input = document.getElementById('altcode-input').value.trim();
    if (input) addCommand(`ALTCODE ${input}`);
    document.getElementById('altcode-input').value = '';
}

function addDelay() {
    const delay = document.getElementById('delay-input').value.trim();
    if (delay) addCommand(`DELAY ${delay}`);
}

function addDefaultDelay() {
    const defaultDelay = document.getElementById('default-delay-input').value.trim();
    if (defaultDelay !== '') addCommand(`DEFAULT_DELAY ${defaultDelay}`);
}

function addWaitForButtonPress() {
    addCommand('WAIT_FOR_BUTTON_PRESS');
}

function addRepeat() {
    const n = document.getElementById('repeat-input').value.trim();
    if (n && Number(n) > 0) addCommand(`REPEAT ${n}`);
    document.getElementById('repeat-input').value = '';
}

function addAltChar() {
    const altChar = document.getElementById('altchar-input').value.trim();
    if (altChar) addCommand(`ALTCHAR ${altChar}`);
    document.getElementById('altchar-input').value = '';
}

function saveOutput() {
    const filename = prompt('Enter the payload name', 'payload.txt');
    if (filename === null) return;
    const blob = new Blob([output.value], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = filename || 'payload.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
    flashStatus('SAVED');
}

function copyToClipboard() {
    output.select();
    output.setSelectionRange(0, 99999);
    document.execCommand("copy");
    flashStatus('COPIED');
}

function clearPayload() {
    if (!output.value) return;
    if (!confirm('Clear the entire payload?')) return;
    output.value = '';
    onPayloadChanged('CLEAR');
    flashStatus('CLEARED');
}

function addBulkStrings()   { addBulkLines('bulkStringAltcodeInput', 'STRING'); }
function addBulkAltcodes()  { addBulkLines('bulkStringAltcodeInput', 'ALTCODE'); }
function addBulkRemarks()   { addBulkLines('bulkRemarkInput', 'REM'); }
function addBulkAltchars()  { addBulkLines('bulkAltcharInput', 'ALTCHAR'); }

function addBulkLines(inputId, prefix) {
    const inputArea = document.getElementById(inputId);
    if (!inputArea) return;
    const lines = inputArea.value.split('\n');
    let translated = '';
    for (const raw of lines) {
        const line = raw.trim();
        if (line === '') continue;
        translated += `${prefix} ${line}\n`;
    }
    if (translated) {
        output.value += translated;
        onPayloadChanged(prefix);
    }
    inputArea.value = '';
}

function insertCommand(value) {
    output.value += value + '\n';
    onPayloadChanged(value);
}

/* ===================== UI live status ===================== */

const lineCountEl = document.getElementById('line-count');
const charCountEl = document.getElementById('char-count');
const lcdLinesEl  = document.getElementById('lcd-lines');
const lcdStatusEl = document.getElementById('lcd-status');
const lcdBarEl    = document.getElementById('lcd-bar');
const lastActEl   = document.getElementById('last-action');

function onPayloadChanged(lastCmd) {
    const value = output.value;
    const lines = value ? value.split('\n').filter(l => l.length > 0).length : 0;
    const chars = value.length;

    if (lineCountEl) lineCountEl.textContent = lines;
    if (charCountEl) charCountEl.textContent = chars;

    if (lcdLinesEl) lcdLinesEl.textContent = String(lines).padStart(4, '0');
    if (lcdStatusEl) lcdStatusEl.textContent = lines === 0 ? 'IDLE' : 'ARMED';
    if (lcdBarEl) {
        const pct = Math.min(100, lines * 4);
        lcdBarEl.style.width = pct + '%';
    }
    if (lastCmd && lastActEl) {
        const label = String(lastCmd).split(/\s+/)[0].slice(0, 18);
        lastActEl.innerHTML = '→ ' + label;
    }
}

function flashStatus(text) {
    if (!lastActEl) return;
    const prev = lastActEl.innerHTML;
    lastActEl.innerHTML = '✓ ' + text;
    lastActEl.style.color = 'var(--phosphor)';
    setTimeout(() => {
        lastActEl.style.color = '';
        lastActEl.innerHTML = prev;
    }, 1400);
}

if (output) {
    output.addEventListener('input', () => onPayloadChanged());
    onPayloadChanged();
}

/* ===================== Marquee ticker ===================== */

(function tickMarquee() {
    const el = document.getElementById('marquee');
    if (!el) return;
    const messages = [
        '// awaiting operator input — write payload, transfer to SD, deploy via BadUSB app //',
        '// tip — DELAY 1000 waits one second. minimum is 100 ms //',
        '// tip — DEFAULT_DELAY applies between every command //',
        '// tip — STRING types text verbatim. ALTCODE for Alt+Numpad chars //',
        '// tip — REPEAT N replays the next command N times //',
        '// reference — developer.flipper.net › BadUSB file format //'
    ];
    let i = 0;
    setInterval(() => {
        i = (i + 1) % messages.length;
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = messages[i];
            el.style.opacity = '';
        }, 250);
    }, 5500);
    el.style.transition = 'opacity 250ms ease';
})();
