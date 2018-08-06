export default {
  "publicPath": "http://116.62.201.135/midc/static/",
  hashHistory: true,
  plugins: [
    'umi-plugin-polyfill',
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [
          /models/,
          /services/,
        ],
      },
    ],
  ],
}
