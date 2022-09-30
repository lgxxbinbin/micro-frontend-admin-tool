// javascript

const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

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
