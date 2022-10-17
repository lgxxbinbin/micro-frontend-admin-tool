// javascript

const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(
  '/novagroup',
  createProxyMiddleware({
    target: 'https://www.google.com/',
    changeOrigin: true,
    // followRedirects: true,
    // router: customRouter,
    logger: console,
    // protocolRewrite: 'https://google.com',
    // hostRewrite: true,
    // headers: {
    //   host: 'https://www.google.com/webhp?igu=1',
    // },
    // toProxy: true,
    // ignorePath: true,
    pathRewrite: {
      '^/novagroup': '', //remove /novagroup'
      '^/': '',
    },
    // pathRewrite: function (path) {
    //   // return path.replace('/novagroup', '')
    // },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log('proxyReq ')
        /* handle proxyReq */
      },
      proxyRes: (proxyRes, req, res) => {
        /* handle proxyRes */
        console.log('proxyRes ')
      },
      error: (err, req, res) => {
        console.log('error ')
        /* handle error */
      },
    },
    onProxyReq(proxyReq, req, res) {
      // console.debug('onProxyReq() proxyReq headers:', proxyReq)
      console.log(' onProxyReq')
      // proxyReq.setHeader('Referer', 'https://google.com')
      // return proxyReq
    },
    onProxyRes(proxyRes, req, res) {
      // console.debug('onProxyReq() proxyReq headers:', proxyReq)
      console.log(' onProxyRes')
      // proxyReq.setHeader('Referer', 'https://google.com')
      // return proxyReq
    },
  })
)

app.use(
  '/store',
  createProxyMiddleware({
    target: 'http://localhost:6500',
  })
)

app.use(
  '/widget',
  createProxyMiddleware({
    target: 'http://localhost:6400',
  })
)

app.use(
  '/login',
  createProxyMiddleware({
    target: 'http://localhost:6300',
  })
)

app.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://localhost:6300',
  })
)

app.use(
  '/order',
  createProxyMiddleware({
    target: 'http://localhost:6200',
  })
)

app.use(
  '/dashboard',
  createProxyMiddleware({
    target: 'http://localhost:6100',
  })
)

app.use(
  '/shell',
  createProxyMiddleware({
    target: 'http://localhost:6001',
  })
)

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:6001',
  })
)

app.listen(3000)
