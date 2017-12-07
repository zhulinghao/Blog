
## Build Setup
先把项目克隆到本地

cd到MusashiBlog目录

# 安装依赖包
npm install

# 启动client端服务器 地址在localhost:8080
npm run dev

# 启动server端服务器   地址在localhost:5000
cd server
node index.js

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
