const proxy = {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: {
      "^/api": '/'
    }
  },
  '/hy': {
    target: 'http://localhost:9000',
    changeOrigin: true,
  }
}