# BadUSB Payload Generator for Flipper Zero

![Logo](logo.png)

This repository provides a web UI for generating custom BadUSB payloads for the Flipper Zero device. With this tool, you can easily create and modify payloads that can be used with Flipper Zero's BadUSB feature. 

## Features

- **Web UI**: Simple and intuitive interface to design your BadUSB payloads.
- **Custom Payloads**: Create payloads with different actions, such as typing, executing commands, or sending keystrokes.
- **Flipper Zero Compatibility**: Payloads generated are compatible with the Flipper Zero device.
- **No Programming Required**: Generate payloads without writing any code. _(I Know... BadUSB "coding" is not complex at all)

## Installation
To run the web UI locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/davidlahoz/badusb-flipper-payload-generator.git
1. **Clone the repository**:
   Navigate to the project folder and open index.html

## Usage

- **Create a Payload**: Use the form fields in the UI to customize your payload (e.g., select actions, add delays, etc.).
- **Download the Payload**: Once your payload is ready, download the .flipper or .bin file to load it into your Flipper Zero device.
- **Load the Payload**: Transfer the generated file to your Flipper Zero and use the BadUSB functionality to execute the payload.

## Contributing
If you'd like to contribute, feel free to fork the repository, open issues, or submit pull requests. Contributions are welcome.
I am aware that is not really complex code, however I thought it would be a nice tool for Flipper-Rookies

## License
This project is licensed under the [MIT License](LICENSE)