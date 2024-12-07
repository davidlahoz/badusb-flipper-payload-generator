document.getElementById('save-btn').addEventListener('click', saveOutput);
document.getElementById('add-remark-btn').addEventListener('click', addRemark);
document.getElementById('add-string-btn').addEventListener('click', addString);
document.getElementById('add-altcode-btn').addEventListener('click', addAltCode);
document.getElementById('add-delay-btn').addEventListener('click', addDelay);
document.getElementById('add-default-delay-btn').addEventListener('click', addDefaultDelay);
document.getElementById('add-button-press-btn').addEventListener('click', addWaitForButtonPress);

document.getElementById('bulkStringBtn').addEventListener('click', addBulkStrings);
document.getElementById('bulkAltcodeBtn').addEventListener('click', addBulkAltcodes);
document.getElementById('bulkRemarkBtn').addEventListener('click', addBulkRemarks);
document.getElementById('bulkAltcharBtn').addEventListener('click', addBulkAltchars);

document.getElementById('saveAlternateBtn').addEventListener('click', copyToClipboard);

function addCommand(command) {
    const output = document.getElementById('output');
    output.value += `${command}\n`;
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
    if (defaultDelay) addCommand(`DEFAULT_DELAY ${defaultDelay}`);
}

function addWaitForButtonPress() {
    addCommand('WAIT_FOR_BUTTON_PRESS');
}

function addAltChar() {
    const altChar = document.getElementById('altchar-input').value.trim();
    if (altChar) addCommand(`ALTCHAR ${altChar}`);
    document.getElementById('altchar-input').value = '';
}

function saveOutput() {
    const output = document.getElementById('output');
    const filename = prompt('Enter the payload name', 'payload.txt');
    const blob = new Blob([output.value], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = filename || 'payload.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    output.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Output copied to clipboard!");
}

function addBulkStrings() {
    const inputArea = document.getElementById('bulkStringAltcodeInput');
    const output = document.getElementById('output');
    let translatedInput = '';

    const lines = inputArea.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;
        translatedInput += `STRING ${line}\n`;
    }

    if (inputArea.value && inputArea.value[inputArea.value.length - 1] !== '\n') {
        translatedInput += '\n';
    }

    output.value += translatedInput.trim() + '\n';
    inputArea.value = '';
}

function addBulkAltcodes() {
    const inputArea = document.getElementById('bulkStringAltcodeInput');
    const output = document.getElementById('output');
    let translatedInput = '';

    const lines = inputArea.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;
        translatedInput += `ALTCODE ${line}\n`;
    }

    if (inputArea.value && inputArea.value[inputArea.value.length - 1] !== '\n') {
        translatedInput += '\n';
    }

    output.value += translatedInput.trim() + '\n';
    inputArea.value = '';
}

function addBulkRemarks() {
    const inputArea = document.getElementById('bulkRemarkInput');
    const output = document.getElementById('output');
    let translatedInput = '';

    const lines = inputArea.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;
        translatedInput += `REM ${line}\n`;
    }

    if (inputArea.value && inputArea.value[inputArea.value.length - 1] !== '\n') {
        translatedInput += '\n';
    }

    output.value += translatedInput.trim() + '\n';
    inputArea.value = '';
}

function addBulkAltchars() {
    const inputArea = document.getElementById('bulkAltcharInput');
    const output = document.getElementById('output');
    let translatedInput = '';

    const lines = inputArea.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;
        translatedInput += `ALTCHAR ${line}\n`;
    }

    if (inputArea.value && inputArea.value[inputArea.value.length - 1] !== '\n') {
        translatedInput += '\n';
    }

    output.value += translatedInput.trim() + '\n';
    inputArea.value = '';
}

function insertCommand(value) {
    const output = document.getElementById('output');
    output.value += value + '\n';
}
