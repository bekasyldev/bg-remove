export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '3000',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '3307', 10),
    DB_NAME: process.env.DB_NAME || 'wordpress_bgremove',
    DB_USER: process.env.DB_USER || 'wpuser',
    DB_PASSWORD: process.env.DB_PASSWORD || 'Bgremove123@',
    NEXT_PUBLIC_WP_API_URL: process.env.NEXT_PUBLIC_WP_API_URL || 'https://grayai.ru/wp/wp-json/wp/v2',
};
