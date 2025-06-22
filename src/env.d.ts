/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegisteredSW?: (swScriptUrl: string) => void
    onRegisterError?: (error: any) => void
  }

  export function registerSW(options?: RegisterSWOptions): void
}

/// <reference types="vite/client" />

declare module '@vite-pwa/plugin' {
  import { Plugin } from 'vite';
  export function VitePWA(options: any): Plugin;
}