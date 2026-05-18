# 演进计划

## 当前状态
- 后端：Express + better-sqlite3（端口 3000），已有 users/demonstrations/actions 表
- 前端：React + Vite，user_id 基于 localStorage 随机生成
- 问题：换浏览器/设备数据丢失，无认证，无成就

## 阶段一：数据持久化（用户体系）
### 后端改动
- [x] 安装 `jsonwebtoken` `bcryptjs`
- [ ] 新增 `achievements` 表
- [ ] 新增 `user_achievements` 表（已解锁成就）
- [ ] 新增 `auth_tokens` 表（refresh token）
- [ ] 新增 `/api/auth/register` 注册接口
- [ ] 新增 `/api/auth/login` 登录接口
- [ ] 新增 `/api/auth/refresh` 刷新 token 接口
- [ ] middleware：`authenticateToken` 中间件
- [ ] `/api/users/:id/profile` 改为需要认证

### 前端改动
- [ ] 登录/注册页面（独立的 Auth 组件，兼容游客模式）
- [ ] 游客模式：localStorage user_id 匿名演练
- [ ] 登录模式：JWT 持久化，演练数据绑定账号
- [ ] 个人中心显示登录状态/去登录按钮
- [ ] 统一 Profile 组件支持展示账号用户数据

## 阶段二：成就系统
### 后端改动
- [ ] 定义成就元数据（JSON）
- [ ] `POST /api/achievements` 获取用户成就列表
- [ ] `POST /api/achievements/:id/unlock` 解锁成就（演练完成时自动触发）
- [ ] 成就解锁规则引擎：
  - 完成 S01-S06 每个场景各解锁一个「初识」成就
  - 首次得分 >= 80 → 「警觉者」
  - 同一场景演练 3 次 → 「老练」
  - 所有场景全部完成 → 「全能防骗王」
  - 累计得分超过阈值 → 「累计勋章」
  - 雷达图所有维度 >= 60 → 「均衡防守」
  - …待扩展

### 前端改动
- [ ] 成就展示页面/弹窗
- [ ] 个人中心显示成就徽章墙
- [ ] 成就解锁时显示 toast 提示
- [ ] 成就数据接入雷达图/统计面板

## 阶段三：功能补齐
- [ ] 完善导航：成就入口（个人中心或独立 tab）
- [ ] 前端错误处理（401 跳转登录、500 友好提示）
- [ ] 防止游客数据丢失：游客演练记录与账号合并逻辑（可选）
- [ ] 成就系统 UI 设计（徽章样式）

## 技术选型
- Auth: JWT（access token 1h + refresh token 7d），refresh token 存 DB
- Password: bcrypt（cost 12）
- 用户标识：email 为唯一标识，支持游客模式（无 email）
- 游客合并：可选功能，游客 ID 可绑定正式账号