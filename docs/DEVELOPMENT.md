# 开发指南 (Development Guide)

本文档为 **Neuro-Link: Shadow Proxy** 的开发者提供详细的开发指导。

---

## 📋 目录

- [环境设置](#环境设置)
- [项目结构](#项目结构)
- [核心概念](#核心概念)
- [开发工作流](#开发工作流)
- [调试技巧](#调试技巧)
- [性能优化](#性能优化)
- [常见问题](#常见问题)

---

## 🛠️ 环境设置

### 前置要求

```json
{
  "node": ">=18.0.0",
  "npm": ">=9.0.0",
  "browser": "Chrome 90+ / Edge 90+ / Firefox 88+"
}
```

### 安装步骤

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd xgame

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# 访问 http://localhost:5173/
```

### 可用命令

```bash
# 开发模式 (热重载)
npm run dev

# 类型检查
npm run type-check

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 📁 项目结构

```
xgame/
├── PRD/                      # 产品需求文档
│   ├── 00-项目概览.md
│   ├── 01-游戏设计文档-GDD.md
│   ├── 02-技术方案-TechSpec.md
│   └── 03-实施计划-ExecutionPlan.md
│
├── docs/                     # 开发文档 (本目录)
│   ├── DEVELOPMENT.md        # 开发指南
│   ├── ARCHITECTURE.md       # 架构文档
│   ├── API.md                # API 文档
│   ├── CONTRIBUTING.md       # 贡献指南
│   └── CHANGELOG.md          # 更新日志
│
├── src/
│   ├── ai/                   # AI 模块
│   │   ├── MediaPipeTracker.ts    # MediaPipe 封装
│   │   ├── IntentEngine.ts        # 意图识别引擎
│   │   └── SmoothingBuffer.ts     # 数据平滑
│   │
│   ├── core/                 # 核心引擎
│   │   ├── EventBus.ts            # 事件总线
│   │   ├── GameLoop.ts            # 游戏主循环
│   │   ├── SceneManager.ts        # Three.js 场景管理
│   │   ├── GameManager.ts         # 游戏逻辑管理
│   │   └── AudioManager.ts        # 音效系统
│   │
│   ├── entities/             # 游戏实体
│   │   ├── Agent.ts               # 玩家角色
│   │   ├── Enemy.ts               # 敌人
│   │   └── SkeletonPreview.ts     # 骨骼可视化
│   │
│   ├── effects/              # 视觉特效
│   │   ├── VisualResidual.ts      # 视觉残留
│   │   └── ParticleSystem.ts      # 粒子系统
│   │
│   ├── ui/                   # UI 组件
│   │   └── HUD.ts                 # 抬头显示
│   │
│   ├── styles/               # 样式
│   │   ├── variables.css          # CSS 变量
│   │   ├── animations.css         # CSS 动画
│   │   └── main.css               # 主样式
│   │
│   ├── types/                # 类型定义
│   │   └── game.ts                # 游戏类型
│   │
│   ├── App.ts                # 主应用
│   └── main.ts               # 入口文件
│
├── public/                   # 静态资源
├── index.html                # HTML 入口
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
└── README.md                 # 项目说明
```

---

## 🧠 核心概念

### 1. 事件驱动架构

项目使用 **EventBus** 实现模块间解耦通信：

```typescript
// 发射事件
eventBus.emit('intent:changed', {
  type: IntentType.ATTACK,
  confidence: 0.9,
  timestamp: Date.now()
});

// 监听事件
eventBus.on('intent:changed', (event) => {
  console.log('Intent changed:', event.type);
});
```

**核心事件:**
- `tracker:status` - 追踪器状态变化
- `tracker:data` - 骨骼数据更新
- `intent:changed` - 意图变化
- `game:score` - 分数更新
- `game:combo` - 连击更新

### 2. 游戏循环

使用 `requestAnimationFrame` 实现高精度游戏循环：

```typescript
// 固定时间步长更新 (物理/AI)
gameLoop.onFixedUpdate((deltaTime, elapsedTime) => {
  // 60 FPS 固定更新
});

// 可变时间步长更新 (逻辑)
gameLoop.onUpdate((deltaTime, elapsedTime) => {
  agent.update(deltaTime);
});

// 渲染
gameLoop.onRender((deltaTime, elapsedTime) => {
  sceneManager.render();
});
```

### 3. 意图识别流程

```
原始数据 → 平滑缓冲 → 模式匹配 → 意图输出
   ↓           ↓           ↓           ↓
MediaPipe  5帧平均    阈值检测    事件发射
```

**意图优先级:**
```
子弹时间 > 防御 > 攻击 > 移动 > 待机
```

### 4. 单例模式

核心系统使用单例模式：

```typescript
// 导出单例
export const eventBus = new EventBus();
export const gameLoop = new GameLoop();
export const sceneManager = new SceneManager();
export const audioManager = new AudioManager();
export const intentEngine = new IntentEngine();
```

---

## 🔄 开发工作流

### 添加新意图

1. **定义意图类型** (`src/types/game.ts`)
```typescript
export enum IntentType {
  // ... 现有意图
  NEW_INTENT = 'NEW_INTENT'
}
```

2. **实现检测逻辑** (`src/ai/IntentEngine.ts`)
```typescript
private detectIntent(...): IntentType {
  // 添加新的检测逻辑
  if (this.isNewIntent(pose, hands)) {
    return IntentType.NEW_INTENT;
  }
  // ...
}

private isNewIntent(...): boolean {
  // 实现检测算法
}
```

3. **添加 Agent 响应** (`src/entities/Agent.ts`)
```typescript
private handleIntent(intent: IntentType): void {
  switch (intent) {
    case IntentType.NEW_INTENT:
      this.newAction();
      break;
    // ...
  }
}
```

4. **添加音效** (`src/core/AudioManager.ts`)
```typescript
private playIntentSound(intent: IntentType): void {
  switch (intent) {
    case IntentType.NEW_INTENT:
      this.playNewSound();
      break;
    // ...
  }
}
```

### 添加新敌人类型

1. **创建敌人类** (`src/entities/NewEnemy.ts`)
```typescript
export class NewEnemy extends Enemy {
  // 继承并扩展
}
```

2. **更新生成逻辑** (`src/core/GameManager.ts`)
```typescript
private spawnEnemies(): void {
  const enemyType = Math.random() > 0.5 ? Enemy : NewEnemy;
  const enemy = new enemyType(position);
  // ...
}
```

---

## 🐛 调试技巧

### 1. 启用调试模式

在 `src/App.ts` 中添加：

```typescript
const DEBUG = true;

if (DEBUG) {
  // 显示 FPS
  // 显示碰撞盒
  // 输出详细日志
}
```

### 2. 查看骨骼数据

```typescript
eventBus.on('tracker:data', (data) => {
  console.log('Pose:', data.pose);
  console.log('Left Hand:', data.leftHand);
  console.log('Right Hand:', data.rightHand);
});
```

### 3. 调整意图阈值

在 `src/ai/IntentEngine.ts` 中修改配置：

```typescript
const DEFAULT_CONFIG: IntentEngineConfig = {
  smoothingFrames: 5,        // 增加平滑度
  moveThreshold: 0.08,       // 降低灵敏度
  crouchThreshold: 0.75,     // 调整下蹲检测
  // ...
};
```

### 4. 使用浏览器开发工具

- **Performance** - 分析性能瓶颈
- **Memory** - 检测内存泄漏
- **Console** - 查看日志输出

---

## ⚡ 性能优化

### 1. 对象池

为频繁创建的对象实现对象池：

```typescript
class EnemyPool {
  private pool: Enemy[] = [];
  
  acquire(): Enemy {
    return this.pool.pop() || new Enemy();
  }
  
  release(enemy: Enemy): void {
    enemy.reset();
    this.pool.push(enemy);
  }
}
```

### 2. 减少 GC 压力

```typescript
// ❌ 每帧创建新对象
const position = new THREE.Vector3(x, y, z);

// ✅ 复用对象
this.tempVector.set(x, y, z);
```

### 3. LOD (Level of Detail)

根据距离调整细节：

```typescript
const distance = camera.position.distanceTo(object.position);
if (distance > 10) {
  object.visible = false; // 剔除远处对象
}
```

### 4. 限制粒子数量

```typescript
const MAX_PARTICLES = 1000;
if (particleCount > MAX_PARTICLES) {
  // 移除最旧的粒子
}
```

---

## ❓ 常见问题

### Q: 摄像头无法启动？

**A:** 检查以下几点：
1. 浏览器是否支持 MediaPipe
2. 是否授予摄像头权限
3. 是否使用 HTTPS 或 localhost
4. 检查控制台错误信息

### Q: 意图识别不准确？

**A:** 调整阈值：
```typescript
// 降低灵敏度
moveThreshold: 0.10  // 从 0.08 增加到 0.10
```

### Q: 帧率过低？

**A:** 优化建议：
1. 降低粒子数量
2. 减少敌人生成频率
3. 禁用视觉残留效果
4. 降低 MediaPipe 模型复杂度

### Q: 如何添加键盘控制？

**A:** 在 `src/App.ts` 中添加：
```typescript
window.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    eventBus.emit('intent:changed', {
      type: IntentType.MOVE_LEFT,
      confidence: 1.0,
      timestamp: Date.now()
    });
  }
});
```

---

## 📚 相关文档

- [架构文档](./ARCHITECTURE.md) - 系统设计详解
- [API 文档](./API.md) - 核心模块接口
- [贡献指南](./CONTRIBUTING.md) - 代码规范和流程

---

**Happy Coding! 🚀**
