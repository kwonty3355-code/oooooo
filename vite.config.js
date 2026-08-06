import { defineConfig } from 'vite';

// Phase 1: 외부 의존성 없음. 정적 배포 대상(Firebase Hosting)을 고려해 상대 경로 사용.
export default defineConfig({
  base: './',
  server: {
    open: true,
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
