const {
  convertJSONToNetworkConfig,
  convertJSONFileToNetworkConfig,
} = require("./lib/convertJSONToNetworkConfig");
const {
  parseNetworkConfig,
  convertNetworkFileToJSON,
} = require("./lib/convertNetworkToJSON");

module.exports = {
  convertJSONToNetworkConfig,
  convertJSONFileToNetworkConfig,
  parseNetworkConfig,
  convertNetworkFileToJSON,
};
