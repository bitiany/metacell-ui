const proxy = {
  '/api': {
    target: 'http://localhost:9101',
    changeOrigin: true,
    pathRewrite: {
      "^/api": '/'
    }
  }
}