import bcrypt from 'bcryptjs';
import { pool } from './db.js';
import 'dotenv/config';

const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
await pool.query('INSERT INTO users (username,password_hash,full_name,role) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)', [process.env.ADMIN_USERNAME || 'admin', hash, 'Amministratore', 'ADMIN']);
console.log('Seed completato');
await pool.end();
