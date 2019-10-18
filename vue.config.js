module.exports = {
  publicPath: "/my_call/",
  devServer: {
    host: "localhost",
    port: 8080,
    hot: true,
    open: true,
    compress: true,
    proxy: {
      "/api": {
        target: "http://192.168.5.179:3030",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
