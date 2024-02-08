
interface ImportMetaEnv {
    readonly PUBLIC_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

/// <reference types="astro/client" />