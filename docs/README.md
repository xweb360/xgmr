# 文档中心 (Documentation Hub)

欢迎来到 **Neuro-Link: Shadow Proxy** 文档中心！

---

## 📚 文档导航

### 🚀 快速开始

新手推荐阅读顺序：

1. [README](../README.md) - 项目概览和快速开始
2. [开发指南](./DEVELOPMENT.md) - 环境设置和开发工作流
3. [游戏设计文档](../PRD/01-游戏设计文档-GDD.md) - 了解游戏玩法

---

## 📖 开发者文档

### 核心文档

| 文档 | 说明 | 适合人群 |
|------|------|----------|
| [开发指南](./DEVELOPMENT.md) | 环境设置、核心概念、调试技巧 | 所有开发者 |
| [架构文档](./ARCHITECTURE.md) | 系统设计、数据流、设计模式 | 架构师、高级开发者 |
| [API 文档](./API.md) | 核心模块接口参考 | 功能开发者 |
| [贡献指南](./CONTRIBUTING.md) | 代码规范、提交规范、PR 流程 | 贡献者 |
| [更新日志](./CHANGELOG.md) | 版本历史和路线图 | 所有人 |

### 快速链接

**开发环境**
- [环境设置](./DEVELOPMENT.md#环境设置)
- [项目结构](./DEVELOPMENT.md#项目结构)
- [可用命令](./DEVELOPMENT.md#环境设置)

**核心概念**
- [事件驱动架构](./DEVELOPMENT.md#核心概念)
- [游戏循环](./DEVELOPMENT.md#核心概念)
- [意图识别流程](./DEVELOPMENT.md#核心概念)

**开发工作流**
- [添加新意图](./DEVELOPMENT.md#添加新意图)
- [添加新敌人类型](./DEVELOPMENT.md#添加新敌人类型)
- [调试技巧](./DEVELOPMENT.md#调试技巧)

**架构设计**
- [系统概览](./ARCHITECTURE.md#系统概览)
- [分层架构](./ARCHITECTURE.md#分层架构)
- [数据流](./ARCHITECTURE.md#数据流)
- [设计模式](./ARCHITECTURE.md#设计模式)

**API 参考**
- [核心系统](./API.md#核心系统)
- [AI 模块](./API.md#ai-模块)
- [游戏实体](./API.md#游戏实体)
- [特效系统](./API.md#特效系统)

---

## 📋 产品文档

### PRD 系列

| 文档 | 说明 | 适合人群 |
|------|------|----------|
| [项目概览](../PRD/00-项目概览.md) | 项目整体介绍、核心理念 | 所有人 |
| [游戏设计文档](../PRD/01-游戏设计文档-GDD.md) | 玩法设计、美术风格 | 设计师、开发者 |
| [技术方案](../PRD/02-技术方案-TechSpec.md) | 技术架构、实现细节 | 开发者、架构师 |
| [实施计划](../PRD/03-实施计划-ExecutionPlan.md) | 开发计划、里程碑 | 项目经理、开发者 |

---

## 🎯 按角色分类

### 新手开发者

**推荐阅读路径:**

1. ✅ [README](../README.md) - 了解项目
2. ✅ [开发指南 - 环境设置](./DEVELOPMENT.md#环境设置)
3. ✅ [开发指南 - 项目结构](./DEVELOPMENT.md#项目结构)
4. ✅ [游戏设计文档](../PRD/01-游戏设计文档-GDD.md)
5. ✅ [API 文档](./API.md) - 熟悉接口

**常见任务:**
- [如何运行项目](./DEVELOPMENT.md#环境设置)
- [如何调试](./DEVELOPMENT.md#调试技巧)
- [如何提交代码](./CONTRIBUTING.md#pull-request-流程)

---

### 功能开发者

**推荐阅读路径:**

1. ✅ [架构文档](./ARCHITECTURE.md) - 理解系统设计
2. ✅ [API 文档](./API.md) - 熟悉接口
3. ✅ [开发指南 - 开发工作流](./DEVELOPMENT.md#开发工作流)
4. ✅ [贡献指南](./CONTRIBUTING.md) - 遵循规范

**常见任务:**
- [添加新意图](./DEVELOPMENT.md#添加新意图)
- [添加新敌人](./DEVELOPMENT.md#添加新敌人类型)
- [性能优化](./DEVELOPMENT.md#性能优化)

---

### 架构师/技术负责人

**推荐阅读路径:**

1. ✅ [技术方案](../PRD/02-技术方案-TechSpec.md)
2. ✅ [架构文档](./ARCHITECTURE.md)
3. ✅ [技术决策](./ARCHITECTURE.md#技术决策)
4. ✅ [性能考量](./ARCHITECTURE.md#性能考量)

**关注点:**
- [系统架构](./ARCHITECTURE.md#系统概览)
- [设计模式](./ARCHITECTURE.md#设计模式)
- [技术选型](./ARCHITECTURE.md#技术决策)
- [未来演进](./ARCHITECTURE.md#未来架构演进)

---

### 贡献者

**推荐阅读路径:**

1. ✅ [贡献指南](./CONTRIBUTING.md)
2. ✅ [代码规范](./CONTRIBUTING.md#代码规范)
3. ✅ [提交规范](./CONTRIBUTING.md#提交规范)
4. ✅ [PR 流程](./CONTRIBUTING.md#pull-request-流程)

**必读:**
- [行为准则](./CONTRIBUTING.md#行为准则)
- [如何贡献](./CONTRIBUTING.md#如何贡献)
- [问题报告](./CONTRIBUTING.md#问题报告)

---

## 🔍 按主题分类

### AI 与机器学习

- [MediaPipe 集成](./ARCHITECTURE.md#mediapipetracker)
- [意图识别算法](./ARCHITECTURE.md#intentengine)
- [数据平滑](./ARCHITECTURE.md#smoothingbuffer)
- [AI 处理流程](./ARCHITECTURE.md#数据流)

### 3D 图形与渲染

- [Three.js 场景管理](./API.md#scenemanager)
- [粒子系统](./API.md#particlesystem)
- [视觉残留效果](./API.md#visualresidual)
- [骨骼可视化](./API.md#skeletonpreview)

### 游戏逻辑

- [游戏循环](./API.md#gameloop)
- [游戏管理器](./API.md#gamemanager)
- [Agent 系统](./API.md#agent)
- [Enemy 系统](./API.md#enemy)

### 音效与交互

- [音效系统](./ARCHITECTURE.md#audiomanager)
- [事件总线](./API.md#eventbus)
- [HUD 系统](./API.md#hud)

---

## 📊 文档统计

| 类型 | 数量 | 总字数 |
|------|------|--------|
| 开发文档 | 5 | ~15,000 |
| 产品文档 | 4 | ~12,000 |
| 代码注释 | - | ~3,000 |
| **总计** | **9+** | **~30,000** |

---

## 🔄 文档更新

### 最近更新

- **2026-01-20**: 创建完整文档体系
  - ✅ 开发指南
  - ✅ 架构文档
  - ✅ API 文档
  - ✅ 贡献指南
  - ✅ 更新日志

### 待完善

- [ ] 添加更多代码示例
- [ ] 补充性能测试数据
- [ ] 添加故障排除指南
- [ ] 创建视频教程

---

## 💡 使用建议

### 第一次接触项目？

```
README → 开发指南 → 游戏设计文档 → 开始编码
```

### 想要贡献代码？

```
贡献指南 → 代码规范 → 开发指南 → API 文档
```

### 想要理解架构？

```
架构文档 → 技术方案 → API 文档 → 源代码
```

### 遇到问题？

1. 查看 [常见问题](./DEVELOPMENT.md#常见问题)
2. 搜索 [Issues](https://github.com/YOUR_USERNAME/xgame/issues)
3. 提交新 Issue

---

## 📞 获取帮助

### 文档相关

- 发现文档错误？[提交 Issue](https://github.com/YOUR_USERNAME/xgame/issues/new)
- 文档不清楚？[提出建议](https://github.com/YOUR_USERNAME/xgame/issues/new)
- 想要补充文档？[提交 PR](./CONTRIBUTING.md#pull-request-流程)

### 技术支持

- 开发问题：查看 [开发指南](./DEVELOPMENT.md)
- API 使用：查看 [API 文档](./API.md)
- 架构设计：查看 [架构文档](./ARCHITECTURE.md)

---

## 🎓 学习资源

### 外部资源

**Three.js**
- [官方文档](https://threejs.org/docs/)
- [示例集合](https://threejs.org/examples/)

**MediaPipe**
- [官方文档](https://mediapipe.dev/)
- [Holistic 模型](https://google.github.io/mediapipe/solutions/holistic.html)

**TypeScript**
- [官方手册](https://www.typescriptlang.org/docs/)
- [最佳实践](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

**Vite**
- [官方指南](https://vitejs.dev/guide/)
- [配置参考](https://vitejs.dev/config/)

---

## 📝 文档维护

### 文档规范

- 使用 Markdown 格式
- 遵循 [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)
- 代码示例必须可运行
- 保持文档同步更新

### 贡献文档

欢迎改进文档！请遵循 [贡献指南](./CONTRIBUTING.md)。

---

<div align="center">

**文档版本**: v0.1.0  
**最后更新**: 2026-01-20

[⬆ 回到顶部](#文档中心-documentation-hub)

</div>
