
interface CorsOptions {
    origin: string[],
    optionsSuccessStatus: number
}

export function getCorsOptions(): CorsOptions {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS || "*";
    const allowedOriginsArray = allowedOrigins.split(",").map(item => item.trim());    
    return {
        origin: allowedOriginsArray,
        optionsSuccessStatus: 200
    }
}