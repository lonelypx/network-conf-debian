const fs = require("fs");
const path = require("path");

/**
 * Converts a JSON object to a network configuration string.
 * @param {Object} jsonConfig - The JSON object representing the network configuration.
 * @returns {string} The network configuration string.
 */
function convertJSONToNetworkConfig(jsonConfig) {
  let networkConfig = "";

  for (const [interfaceName, interfaceConfig] of Object.entries(jsonConfig)) {
    networkConfig += `auto ${interfaceName}\n`;
    networkConfig += `iface ${interfaceName} ${interfaceConfig.type} ${interfaceConfig.method}\n`;

    if (interfaceConfig.options) {
      for (const [key, value] of Object.entries(interfaceConfig.options)) {
        networkConfig += `    ${key} ${value}\n`;
      }
    }

    networkConfig += "\n"; // Add a blank line between different interface configurations
  }

  return networkConfig.trim(); // Remove trailing newlines
}

/**
 * Converts a JSON file to a network configuration file.
 * @param {string} jsonFilePath - The path to the JSON file.
 * @param {string} [outputFilePath=null] - The path to the output network configuration file. If not provided, the converted network configuration will be logged to the console.
 * @param {Function} [callback=null] - A callback function to be called with the converted network configuration. Only used if `outputFilePath` is not provided.
 */
function convertJSONFileToNetworkConfig(
  jsonFilePath,
  outputFilePath = null,
  callback = null
) {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading the JSON file: ${err}`);
      return;
    }

    let jsonConfig;
    try {
      jsonConfig = JSON.parse(data);
    } catch (parseErr) {
      console.error(`Error parsing JSON data: ${parseErr}`);
      return;
    }

    const networkConfig = convertJSONToNetworkConfig(jsonConfig);

    if (!outputFilePath) {
      if (callback) {
        callback(networkConfig);
        return;
      }
      console.log(networkConfig);
      return;
    }

    fs.writeFile(outputFilePath, networkConfig, (err) => {
      if (err) {
        console.error(`Error writing network configuration file: ${err}`);
        return;
      }

      console.log(
        `Network configuration has been converted to file format and saved to ${outputFilePath}`
      );
    });
  });
}

module.exports = {
  convertJSONToNetworkConfig,
  convertJSONFileToNetworkConfig,
};
