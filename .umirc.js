export default {
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
