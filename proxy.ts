module.exports = {
  '/api/rental': {
    target: 'http://localhost:8001',
    changeOrigin: true,
    pathRewrite: {
      "^/api/rental": '/rental'
    }
  },
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: {
      "^/api": '/'
    }
  }
  
}