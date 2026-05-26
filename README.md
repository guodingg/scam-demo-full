# 刷单诈骗教育平台 (scam-demo-full)

网络刷单诈骗沉浸式教育演练平台 - 通过模拟真实刷单诈骗场景，提高公众防骗意识。

## 功能特性

- 🔐 用户认证系统 (JWT)
- 🎮 沉浸式诈骗场景演练
- 🏆 成就系统
- 📊 个人数据统计
- 🐳 Docker 一键部署

## 技术栈

**前端**
- React 18
- Vite
- React Router

**后端**
- Express.js
- better-sqlite3
- JWT 认证

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 初始化数据库
npm run db:init

# 启动后端 (新终端)
npm run server

# 启动前端 (新终端)
npm run dev
```

前端访问: http://localhost:5173
后端端口: http://localhost:3000

### Docker 部署

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f
```

访问 http://localhost:3000

## 项目结构

```
├── server/           # 后端 Express 服务
│   ├── index.js      # 服务器入口
│   └── ...
├── src/              # React 前端源码
│   ├── App.jsx       # 主组件
│   └── ...
├── data/             # 数据目录
│   └── scenes.json   # 场景配置数据
├── dist/             # 构建输出目录
├── Dockerfile        # Docker 配置
└── docker-compose.yml
```

## 默认账号

- 用户名: `admin`
- 密码: `admin123`

## 许可证

MIT