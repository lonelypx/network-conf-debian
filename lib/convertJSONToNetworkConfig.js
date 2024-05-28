const fs = require("fs");
const path = require("path");

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

function convertJSONFileToNetworkConfig(jsonFilePath, outputFilePath) {
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
