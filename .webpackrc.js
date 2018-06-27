export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://192.168.1.3:8080/apiM",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
