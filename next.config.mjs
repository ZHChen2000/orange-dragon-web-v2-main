/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React 严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // 环境变量配置
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // 构建输出配置（仅用于生产构建）
  // output: 'standalone', // 注释掉，避免开发模式问题

  // 性能优化
  swcMinify: true,
};

export default nextConfig;





