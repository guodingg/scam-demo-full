# 刷单诈骗教育平台 (scam-demo-full)

网络刷单诈骗沉浸式教育演练平台 - 通过模拟真实刷单诈骗场景，提高公众防骗意识。

## 功能特性

- 🔐 **用户认证系统** - JWT 注册/登录
- 🤖 **AI 智能陪练** - 支持多种大模型（MiniMax、OpenAI GPT、Claude 等）
- 🎮 **沉浸式诈骗场景演练** - 模拟真实刷单诈骗流程
- 💬 **AI 对话分析** - 实时分析用户对话，识别诈骗话术
- 🏆 **成就系统** - 完成任务解锁成就徽章
- 📊 **个人数据统计** - 雷达图展示防骗能力维度
- 🐳 **Docker 一键部署**

## 技术栈

**前端**
- React 18
- Vite
- React Router

**后端**
- Express.js
- better-sqlite3
- JWT 认证

**AI 集成**
- 支持 MiniMax、OpenAI GPT、Claude 等大模型
- AI 实时对话分析
- 智能场景陪练

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

## AI 配置

平台支持配置多个 AI 模型供智能陪练使用：

| 配置项 | 说明 |
|--------|------|
| name | AI 配置名称 |
| provider | 提供商 (minimax / openai / anthropic 等) |
| model | 模型名称 |
| api_key | API 密钥 |
| base_url | API 地址 |
| system_prompt | 系统提示词 |
| enabled | 是否启用 |

管理员可在后台管理 AI 配置，支持设置默认模型。

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