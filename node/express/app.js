const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const port = 6700;

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 在设置代理路由之前添加
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// 代理配置示例
const proxyOptions = {
  target: 'https://www.baidu.com', // 目标服务器地址
  changeOrigin: true, // 修改请求头中的 host
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxy Request:', proxyReq.path);
  },
  onProxyRes: function (proxyRes, req, res) {
    console.log("proxyRes received");
    console.log("Status Code:", proxyRes.statusCode);
    // 需要删除的安全相关响应头列表
    const headersToRemove = [
      'x-frame-options',
      'X-Frame-Options',
      'content-security-policy',
      'Content-Security-Policy',
      'x-content-security-policy',
      'X-Content-Security-Policy',
      'x-webkit-csp',
      'X-Webkit-CSP'
    ];

    // 删除指定的响应头
    headersToRemove.forEach(header => {
      delete proxyRes.headers[header];
    });

    // 设置新的响应头
    const newHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'x-proxy-by': 'express-proxy',
      // 如果确实需要允许iframe嵌入
      'X-Frame-Options': 'ALLOWALL'
    };

    // 添加新的响应头
    Object.entries(newHeaders).forEach(([key, value]) => {
      proxyRes.headers[key] = value;
    });

    // 调试信息
    if (process.env.NODE_ENV === 'development') {
      console.log('Original Headers:', req.headers);
      console.log('Modified Response Headers:', proxyRes.headers);
    }
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  }
};

// 设置代理路由
app.use('/', createProxyMiddleware(proxyOptions));

// 多个代理路由示例
app.use('/api1', createProxyMiddleware({
  target: 'https://api1.example.com',
  changeOrigin: true
}));

app.use('/api2', createProxyMiddleware({
  target: 'https://api2.example.com',
  changeOrigin: true
}));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
