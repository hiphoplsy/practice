const withBundleAnalyzer = require('@next/bundle-analyzer') ({
  enabled: process.env.NODE_ENV === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\ko$/)
    ];
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});

// module.exports = {
//   webpack(config, { webpack }) {
//     const prod = process.env.NODE_ENV === 'production';
//     const plugin = [...config.plugins];
//     if (prod) {
//       plugins.push(new CompressPlugin());
//     }
//     return {
//       ...config,
//       mode: prod ? 'production' : 'development',
//       devtool: prod ? 'hidden-source-map' : 'eval',
//       plugins,
//     }
//   }
// }
