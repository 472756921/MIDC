export default {
  // loading: './src/components/Loader',
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
