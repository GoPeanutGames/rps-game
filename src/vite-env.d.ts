/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_PROJECT_ID?: string
  readonly VITE_RPS_ROUTER_ADDRESS?: Address
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
