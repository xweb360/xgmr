# 贡献指南 (Contributing Guide)

感谢你对 **Neuro-Link: Shadow Proxy** 的关注！我们欢迎所有形式的贡献。

---

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [问题报告](#问题报告)

---

## 🤝 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- ✅ 使用友好和包容的语言
- ✅ 尊重不同的观点和经验
- ✅ 优雅地接受建设性批评
- ✅ 关注对社区最有利的事情
- ✅ 对其他社区成员表示同理心

---

## 🚀 如何贡献

### 贡献类型

1. **报告 Bug** - 发现问题请提 Issue
2. **建议功能** - 有好想法请分享
3. **改进文档** - 文档永远可以更好
4. **提交代码** - 修复 Bug 或实现新功能
5. **优化性能** - 让游戏更流畅

### 开始之前

1. Fork 本仓库
2. 克隆你的 Fork
3. 创建特性分支
4. 进行修改
5. 提交 Pull Request

```bash
# 1. Fork 后克隆
git clone https://github.com/YOUR_USERNAME/xgame.git
cd xgame

# 2. 添加上游仓库
git remote add upstream https://github.com/ORIGINAL_OWNER/xgame.git

# 3. 创建特性分支
git checkout -b feature/your-feature-name

# 4. 进行修改并提交
git add .
git commit -m "feat: add your feature"

# 5. 推送到你的 Fork
git push origin feature/your-feature-name

# 6. 在 GitHub 上创建 Pull Request
```

---

## 📝 代码规范

### TypeScript 风格

```typescript
// ✅ 好的示例
export class IntentEngine {
  private config: IntentEngineConfig;
  
  constructor(config: Partial<IntentEngineConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  
  /**
   * 检测用户意图
   * @param pose 姿态关键点
   * @returns 检测到的意图类型
   */
  private detectIntent(pose: Landmark[]): IntentType {
    // 实现逻辑
  }
}

// ❌ 不好的示例
class intentengine {
  config;
  
  constructor(c) {
    this.config = c;
  }
  
  detect(p) {
    // 缺少类型和注释
  }
}
```

### 命名约定

| 类型 | 约定 | 示例 |
|------|------|------|
| 类 | PascalCase | `IntentEngine` |
| 接口/类型 | PascalCase | `IntentEvent` |
| 方法/函数 | camelCase | `detectIntent()` |
| 变量 | camelCase | `currentIntent` |
| 常量 | UPPER_SNAKE_CASE | `DEFAULT_CONFIG` |
| 私有成员 | private + camelCase | `private config` |
| 文件名 | PascalCase.ts | `IntentEngine.ts` |

### 注释规范

```typescript
/**
 * 类/方法的简要说明
 * 
 * 详细说明 (可选)
 * 
 * @param paramName 参数说明
 * @returns 返回值说明
 * @throws 异常说明 (如果有)
 * 
 * @example
 * ```typescript
 * const engine = new IntentEngine();
 * engine.start();
 * ```
 */
```

### 代码组织

```typescript
// 1. 导入
import * as THREE from 'three';
import { eventBus } from '../core/EventBus';
import type { IntentEvent } from '../types/game';

// 2. 常量
const DEFAULT_CONFIG = { /* ... */ };

// 3. 类型定义 (如果需要)
interface LocalConfig { /* ... */ }

// 4. 类实现
export class MyClass {
  // 4.1 私有属性
  private config: Config;
  
  // 4.2 构造函数
  constructor() { /* ... */ }
  
  // 4.3 公共方法
  public start() { /* ... */ }
  
  // 4.4 私有方法
  private helper() { /* ... */ }
}

// 5. 导出
export const instance = new MyClass();
```

---

## 📋 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(intent): add jump detection` |
| `fix` | Bug 修复 | `fix(audio): resolve sound glitch` |
| `docs` | 文档更新 | `docs(readme): update installation steps` |
| `style` | 代码格式 | `style(agent): format code` |
| `refactor` | 重构 | `refactor(engine): simplify intent logic` |
| `perf` | 性能优化 | `perf(particle): reduce GC pressure` |
| `test` | 测试 | `test(intent): add unit tests` |
| `chore` | 构建/工具 | `chore(deps): update three.js` |

### 示例

```bash
# 好的提交
git commit -m "feat(intent): add double jump detection

Implement double jump detection using vertical velocity threshold.
Closes #42"

# 不好的提交
git commit -m "update code"
git commit -m "fix bug"
```

---

## 🔄 Pull Request 流程

### 1. 准备工作

- [ ] 确保代码通过 TypeScript 检查
- [ ] 测试所有修改的功能
- [ ] 更新相关文档
- [ ] 遵循代码规范

### 2. 创建 PR

**标题格式**: `[Type] Brief description`

**示例**:
- `[Feature] Add voice control support`
- `[Fix] Resolve camera permission issue`
- `[Docs] Improve API documentation`

**描述模板**:

```markdown
## 📝 变更说明
简要描述你的修改

## 🎯 相关 Issue
Closes #123

## ✅ 测试清单
- [ ] 本地测试通过
- [ ] 无 TypeScript 错误
- [ ] 文档已更新

## 📸 截图 (如果适用)
[添加截图]

## 💡 其他说明
[其他需要说明的内容]
```

### 3. Code Review

- 耐心等待维护者审查
- 及时响应反馈
- 根据建议修改代码

### 4. 合并

- PR 被批准后会被合并
- 你的贡献会被记录在 CHANGELOG

---

## 🐛 问题报告

### Bug Report 模板

```markdown
## 🐛 Bug 描述
清晰简洁地描述 Bug

## 📋 复现步骤
1. 打开游戏
2. 点击 '...'
3. 执行 '...'
4. 看到错误

## 🎯 期望行为
描述你期望发生什么

## 📸 截图
如果适用，添加截图

## 🖥️ 环境信息
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 0.1.0]

## 📝 额外信息
其他相关信息
```

### Feature Request 模板

```markdown
## 💡 功能建议
清晰简洁地描述你的建议

## 🎯 解决的问题
这个功能解决了什么问题？

## 💭 期望的解决方案
描述你希望如何实现

## 🔄 替代方案
是否考虑过其他方案？

## 📝 额外信息
其他相关信息
```

---

## 🏆 贡献者

感谢所有贡献者！

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- 这里会自动生成贡献者列表 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📚 相关资源

- [开发指南](./DEVELOPMENT.md)
- [架构文档](./ARCHITECTURE.md)
- [API 文档](./API.md)

---

**感谢你的贡献！🙏**
