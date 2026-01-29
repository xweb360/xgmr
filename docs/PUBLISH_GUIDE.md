# 🚀 Neuro-Link: Shadow Proxy 发布指南

本指南将协助你将游戏从开发环境发布到生产环境。由于游戏依赖摄像头权限，**生产环境必须运行在 HTTPS 协议下**。

---

## 📦 第一步：构建项目 (Build)

在发布之前，你需要将源代码编译并打包为静态资源。

1.  **配置路径**：我已经将 `vite.config.ts` 中的 `base` 设置为 `./`。这意味着无论你将游戏部署在域名的根目录还是子目录（如 `https://example.com/my-game/`），资源都能正确加载。
2.  在项目根目录下运行：
    ```bash
    npm run build
    ```
3.  构建完成后，项目根目录会生成一个 `dist` 文件夹。这个文件夹包含了运行游戏所需的所有 HTML、CSS 和 JavaScript 文件。

### 本地预览构建结果
在正式上传前，建议先在本地测试打包后的版本：
```bash
npm run preview
```

---

## 🌐 第二步：选择发布平台

### 选项 A：GitHub Pages (最推荐，免费)
适合个人作品展示。

1.  **修改配置**：如果你的项目不是部署在域名的根目录（例如 `https://user.github.io/xgame/`），你需要修改 `vite.config.ts`：
    ```typescript
    export default defineConfig({
      base: './', // 或者 '/xgame/'
      // ... 其他配置
    });
    ```
2.  **上传代码**：将 `dist` 目录下的所有内容上传到 GitHub 仓库的 `gh-pages` 分支。
3.  **开启 HTTPS**：GitHub Pages 默认支持 HTTPS，这是摄像头正常工作的必要条件。

### 选项 B：Vercel / Netlify (最便捷)
适合自动化部署，只需关联 GitHub 仓库。

1.  在 Vercel/Netlify 后台关联你的项目仓库。
2.  设置构建命令为 `npm run build`，输出目录为 `dist`。
3.  它们会自动为你配置 HTTPS。

### 选项 C：私有服务器 (Nginx/Apache)
1.  将 `dist` 文件夹内容拷贝到服务器的 Web 根目录。
2.  **关键**：必须为服务器配置 SSL 证书（可以使用 Let's Encrypt 免费证书）。如果通过 `http://` 访问，摄像头将无法启动。

---

## ⚠️ 发布后的注意事项

1.  **HTTPS 强制要求**：再次强调，非 `localhost` 环境下，浏览器只允许在 HTTPS 页面调用 `getUserMedia`。
2.  **CDN 稳定性**：游戏依赖 `cdn.jsdelivr.net` 加载 MediaPipe 模型。请确保你的目标用户能够稳定访问该 CDN。
3.  **性能优化**：
    *   `dist` 文件夹中的资源已经过压缩。
    *   如果发现加载慢，可以考虑将 MediaPipe 的模型文件（`.tflite` 和 `.wasm`）下载到本地 `public` 目录，并修改 `MediaPipeTracker.ts` 中的 `locateFile` 路径。

---

祝你的游戏发布顺利！如果有任何技术问题，请随时联系。
