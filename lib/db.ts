import mysql from 'mysql2/promise';
import { env } from './env';


const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function getConnection() {
  return await pool.getConnection();
}

export async function testConnection(): Promise<boolean> {
  try {
    await pool.execute('SELECT 1');
    console.log('MySQL connection successful');
    return true;
  } catch (error) {
    console.error('MySQL connection failed:', error);
    return false;
  }
}

export default pool;