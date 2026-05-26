# 刷单诈骗教育平台 (scam-demo-full)

网络刷单诈骗沉浸式教育演练平台 - 通过模拟真实刷单诈骗场景，提高公众防骗意识。

## 功能特性

- 🔐 **用户认证系统** - JWT 注册/登录
- 🤖 **AI 智能陪练** - 支持多种大模型（MiniMax、OpenAI GPT、Claude 等）
- 💬 **实时对话分析** - AI 实时分析聊天内容，识别诈骗话术
- 🎮 **沉浸式诈骗场景演练** - 模拟真实刷单诈骗流程，包含多个阶段和选择分支
- 🏆 **成就系统** - 完成任务解锁成就徽章
- 📊 **个人数据统计** - 雷达图展示防骗能力维度
- 🐳 **Docker 一键部署**

## 场景演练

平台内置多个诈骗场景，每个场景包含：

- **诱饵投放** - 骗子通过小额返利诱惑受害者
- **信任建立** - 通过伪造证件、他人截图获取信任
- **大额诈骗** - 诱导垫付大额资金后拉黑
- **风险提示** - 每个节点标注关键词和风险解释

用户通过选择分支影响剧情走向，AI 实时分析并给出防骗建议。

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

## AI 功能说明

### 对话分析
在场景演练过程中，AI 会实时分析：
- 当前对话的诈骗话术类型
- 用户选择的潜在风险
- 关键词和风险点提示

### 智能陪练
用户可与 AI 进行一对一防骗对话练习，AI 扮演诈骗分子或给出防骗建议。

### 后台配置
管理员可在后台管理 AI 配置：
- 添加/编辑/删除 AI 模型配置
- 设置系统提示词
- 配置默认模型
- 启用/禁用配置

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
│   ├── AdminPanel.jsx    # 管理后台
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