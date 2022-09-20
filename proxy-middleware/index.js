// javascript

const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

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

app.listen(3000)
