const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy({
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 1000,
  // customDomain: "https://analytics.cryptostats.community",
})({
  output: "standalone",
});
