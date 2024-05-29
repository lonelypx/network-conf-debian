# Network Config Converter

## Overview

Network Config Converter is a Node.js module that allows you to convert Debian network configuration files to JSON format and vice versa. This can be useful for programmatically managing network configurations in a consistent format.

## Features

- Convert Debian network configuration files to JSON format.
- Convert JSON formatted network configurations back to Debian network configuration files.

## Installation

To install the module, use npm:

```bash
npm install network-conf-debian
```

## Usage

### Converting Network Configuration File to JSON

To convert a Debian network configuration file to JSON, use the `convertNetworkFileToJSON` function.

#### Example

```javascript
const { convertNetworkFileToJSON } = require("network-conf-debian");

const networkConfigPath = "path/to/network-config";
const outputJSONPath = "path/to/network-config.json";

convertNetworkFileToJSON(networkConfigPath, outputJSONPath);
```

#### Callback Example

You can also use a callback function to handle the converted configuration:

```javascript
const {
  convertNetworkFileToJSON,
  convertJSONFileToNetworkConfig,
} = require("network-conf-debian");

convertNetworkFileToJSON("/etc/network/interfaces", null, (jsonConfig) => {
  console.log(jsonConfig);
});
```

### Converting JSON to Network Configuration File

To convert a JSON formatted network configuration to a Debian network configuration file, use the `convertJSONFileToNetworkConfig` function.

#### Example

```javascript
const { convertJSONFileToNetworkConfig } = require("network-conf-debian");

const jsonFilePath = "path/to/network-config.json";
const outputNetworkConfigPath = "path/to/network-config";

convertJSONFileToNetworkConfig(jsonFilePath, outputNetworkConfigPath);
```

## API

### convertNetworkFileToJSON(filePath, outputFilePath)

Converts a Debian network configuration file to a JSON file.

#### Parameters

- `filePath` (string): Path to the input network configuration file.
- `outputFilePath` (string): Path to the output JSON file. If not provided, the JSON string will be returned.
- `callback` (function): Callback function to handle the converted JSON configuration.

### convertJSONFileToNetworkConfig(jsonFilePath, outputFilePath)

Converts a JSON formatted network configuration file to a Debian network configuration file.

#### Parameters

- `jsonFilePath` (string): Path to the input JSON file.
- `outputFilePath` (string): Path to the output network configuration file. If not provided, the converted network configuration will be returned.
- `callback` (function): Callback function to handle the converted network configuration.

### parseNetworkConfig(fileContent)

Parses the content of a Debian network configuration file and returns a JSON object.

#### Parameters

- `fileContent` (string): Content of the network configuration file.

#### Returns

- (object): Parsed JSON object representing the network configuration.

### convertJSONToNetworkConfig(jsonConfig)

Converts a JSON object representing a network configuration to a Debian network configuration format string.

#### Parameters

- `jsonConfig` (object): JSON object representing the network configuration.

#### Returns

- (string): Network configuration in Debian format.

## Example

Here’s an example of how to use both functions in a single script:

```javascript
const {
  convertNetworkFileToJSON,
  convertJSONFileToNetworkConfig,
} = require("network-conf-debian");

// Convert Network Configuration File to JSON
const networkConfigPath = "path/to/network-config";
const outputJSONPath = "path/to/network-config.json";
convertNetworkFileToJSON(networkConfigPath, outputJSONPath);

// Convert JSON to Network Configuration File
const jsonFilePath = "path/to/network-config.json";
const outputNetworkConfigPath = "path/to/network-config";
convertJSONFileToNetworkConfig(jsonFilePath, outputNetworkConfigPath);
```

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

Anil Mathew

## Repository

[GitHub Repository Link](https://github.com/lonelypx/network-conf-debian)

## Keywords

- Network
- Config
- JSON
- Debian
- Converter

## Version History

- **1.0.0**: Initial release
- **1.0.1**: Updated version
