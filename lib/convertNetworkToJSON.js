const fs = require("fs");
const path = require("path");

function parseNetworkConfig(fileContent) {
  const lines = fileContent.split("\n");
  const config = {};
  let currentInterface = null;

  lines.forEach((line) => {
    // Skip comments and empty lines
    if (line.startsWith("#") || line.trim() === "") {
      return;
    }

    const parts = line.trim().split(/\s+/);
    const key = parts[0];
    const value = parts.slice(1).join(" ");

    if (key === "auto" || key === "iface") {
      currentInterface = value.split(" ")[0];
      if (!config[currentInterface]) {
        config[currentInterface] = {};
      }
      if (key === "iface") {
        config[currentInterface].type = value.split(" ")[1];
        config[currentInterface].method = value.split(" ")[2];
      }
    } else if (currentInterface) {
      if (!config[currentInterface].options) {
        config[currentInterface].options = {};
      }
      config[currentInterface].options[key] = value;
    }
  });

  return config;
}

function convertNetworkFileToJSON(filePath, outputFilePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading the file: ${err}`);
      return;
    }

    const parsedConfig = parseNetworkConfig(data);
    const jsonConfig = JSON.stringify(parsedConfig, null, 2);

    fs.writeFile(outputFilePath, jsonConfig, (err) => {
      if (err) {
        console.error(`Error writing JSON file: ${err}`);
        return;
      }

      console.log(
        `Network configuration has been converted to JSON and saved to ${outputFilePath}`
      );
    });
  });
}

module.exports = {
  parseNetworkConfig,
  convertNetworkFileToJSON,
};