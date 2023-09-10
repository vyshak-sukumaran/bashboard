export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            CORS_ALLOWED_ORIGINS: string;
        }
    }
}