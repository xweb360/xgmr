import './styles/main.css';
import { app } from './App';

document.addEventListener('DOMContentLoaded', () => {
  app.init().catch(err => {
    console.error('[Main] App initialization failed:', err);
  });
});

window.addEventListener('beforeunload', () => {
  app.dispose();
});
