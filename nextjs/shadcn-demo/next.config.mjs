/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        // 对于 *.svg?url 文件，使用 url-loader 或 file-loader 来处理
        // '*.svg?url': {
        //   loaders: ['url-loader'], // 使用 file-loader 来处理图像文件
        //   as: '*.url', // 为图像文件指定文件类型
        // },
        // 默认情况下，将所有 *.svg 文件当作 React 组件处理
        '*.svgr': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
