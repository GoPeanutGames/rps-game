/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_PROJECT_ID?: string
  readonly VITE_SOURCE_TOKEN_ADDRESS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
