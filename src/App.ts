/**
 * Neuro-Link: Shadow Proxy - Main Application
 * 应用主入口，协调所有模块
 */

import { sceneManager } from './core/SceneManager';
import { gameLoop } from './core/GameLoop';
import { eventBus } from './core/EventBus';
import { tracker } from './ai/MediaPipeTracker';
import { intentEngine } from './ai/IntentEngine';
import { SkeletonPreview } from './entities/SkeletonPreview';
import { Agent } from './entities/Agent';
import { VisualResidual } from './effects/VisualResidual';
import { ParticleSystem } from './effects/ParticleSystem';
import { HUD } from './ui/HUD';
import { GameManager } from './core/GameManager';
import { audioManager } from './core/AudioManager';
import type { TrackerStatus } from './types/game';

class App {
    private hud!: HUD;
    private skeletonPreview!: SkeletonPreview;
    private visualResidual!: VisualResidual;
    private agent!: Agent;
    private gameManager!: GameManager;
    private particleSystem!: ParticleSystem;

    constructor() {
        console.log('[App] Neuro-Link: Shadow Proxy v0.1.0');
    }

    /**
     * 初始化应用
     */
    async init(): Promise<void> {
        try {
            console.log('[App] Initializing...');

            // 1. 创建 HUD
            this.hud = new HUD();
            this.hud.updateLoadingStatus('Initializing UI...');

            // 2. 初始化 Three.js 场景
            this.hud.updateLoadingStatus('Setting up 3D scene...');
            const canvasContainer = this.hud.getCanvasContainer();

            // 设置一个安全超时，防止初始化挂起
            const initTimeout = setTimeout(() => {
                console.error('[App] Initialization is taking too long...');
                this.hud.updateLoadingStatus('STILL INITIALIZING... CHECK NETWORK');
            }, 10000);

            sceneManager.init({
                container: canvasContainer,
                backgroundColor: 0x0a0a0f
            });

            // 3. 创建骨骼预览
            this.hud.updateLoadingStatus('Creating skeleton system...');
            this.skeletonPreview = new SkeletonPreview({
                nodeColor: 0x00ffff,
                lineColor: 0x00ffff,
                handColor: 0xff00ff,
                nodeSize: 0.04,
                scale: 2.5,
                offsetY: 1.2
            });
            sceneManager.add(this.skeletonPreview.getObject3D());

            // 3.1 创建视觉残留特效
            this.visualResidual = new VisualResidual();
            sceneManager.add(this.visualResidual.getObject3D());

            // 3.2 创建 Agent 角色
            this.agent = new Agent();
            sceneManager.add(this.agent.getObject3D());

            // 3.3 创建粒子系统
            this.particleSystem = new ParticleSystem(sceneManager.getScene());

            // 3.4 创建游戏管理器
            this.gameManager = new GameManager(this.agent, this.particleSystem);

            // 3.5 初始化音效系统
            audioManager.init();

            // 4. 初始化 MediaPipe 追踪器
            this.hud.updateLoadingStatus('Loading AI models...');
            const videoElement = this.hud.getVideoElement();
            await tracker.init(videoElement);

            // 5. 启动意图引擎
            this.hud.updateLoadingStatus('Starting Intent Engine...');
            intentEngine.start();

            // 6. 设置事件监听
            this.setupEventListeners();

            // 7. 启动游戏循环
            this.hud.updateLoadingStatus('Starting game loop...');
            this.startGameLoop();

            // 8. 显示开始按钮
            this.hud.showStartButton();
            this.hud.startFPSUpdate();

            clearTimeout(initTimeout);
            console.log('[App] Initialization complete');

        } catch (error) {
            console.error('[App] Initialization failed:', error);
            this.hud.updateLoadingStatus('Initialization failed!');
        }
    }

    /**
     * 设置事件监听
     */
    private setupEventListeners(): void {
        // 开始游戏按钮
        eventBus.on('ui:startGame', () => {
            this.startTracking();
        });

        // 预览模式
        eventBus.on('ui:previewGame', () => {
            this.enterPreviewMode();
        });

        // 追踪器状态变化
        eventBus.on('tracker:status', (status: TrackerStatus) => {
            console.log('[App] Tracker status:', status);

            if (status === 'RUNNING') {
                this.hud.hideLoadingScreen();
                this.hud.showVideoPreview();
                this.skeletonPreview.startListening();

                // 启动游戏
                this.gameManager.start();
            }
        });

        // 追踪器错误
        eventBus.on('tracker:error', (error: any) => {
            console.error('[App] Tracker error:', error);
            let msg = 'Failed to access camera.';

            // 检查是否是因为非安全上下文导致接口不存在
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                msg = 'Insecure Context: Camera access requires HTTPS or localhost. Please use http://localhost:5173/ instead of an IP address.';
            } else if (error.name === 'NotAllowedError') {
                msg = 'Camera permission denied. Please allow camera access to play with motion control.';
            } else if (error.name === 'NotFoundError') {
                msg = 'No camera detected. Please connect a camera or use Preview Mode.';
            } else if (error.message && error.message.includes('getUserMedia')) {
                msg = 'Browser Error: ' + error.message + '. Try using Chrome or Edge on localhost.';
            }

            this.hud.showCameraError(msg);
        });
    }

    /**
     * 启动游戏循环
     */
    private startGameLoop(): void {
        // 更新回调
        gameLoop.onUpdate((deltaTime) => {
            this.agent.update(deltaTime);
            this.particleSystem.update(deltaTime);
        });

        // 渲染回调
        gameLoop.onRender(() => {
            sceneManager.render();
        });

        gameLoop.start();
    }

    /**
     * 启动追踪
     */
    private async startTracking(): Promise<void> {
        try {
            await tracker.start();
        } catch (error) {
            console.error('[App] Failed to start tracking:', error);
            // 错误处理已在 setupEventListeners 的 tracker:error 中完成
        }
    }

    /**
     * 进入预览模式 (无摄像头)
     */
    private enterPreviewMode(): void {
        console.log('[App] Entering Preview Mode...');
        this.hud.hideLoadingScreen();

        // 在预览模式下，我们仍然启动游戏管理器，但没有 AI 输入
        this.gameManager.start();

        // 提示用户
        const msg = document.createElement('div');
        msg.style.cssText = 'position:fixed; top:80px; left:50%; transform:translateX(-50%); background:rgba(0,255,255,0.2); color:var(--color-primary); padding:10px 20px; border:1px solid var(--color-primary); border-radius:4px; font-family:var(--font-mono); font-size:12px; z-index:100; pointer-events:none;';
        msg.innerText = 'PREVIEW MODE: MOTION CONTROL DISABLED';
        document.body.appendChild(msg);

        // 3秒后消失
        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 1s ease';
            setTimeout(() => msg.remove(), 1000);
        }, 3000);
    }

    /**
     * 销毁应用
     */
    dispose(): void {
        gameLoop.stop();
        this.gameManager.stop();
        tracker.dispose();
        this.skeletonPreview.dispose();
        this.visualResidual.dispose();
        this.agent.dispose();
        sceneManager.dispose();
        intentEngine.dispose();
        eventBus.clear();
        console.log('[App] Disposed');
    }
}

// 导出应用实例
export const app = new App();
