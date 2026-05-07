import { scryptSync, randomBytes } from 'crypto';

const password = process.argv[2];
if (!password) {
  console.error('Usage: node hash-password.mjs <password>');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 32).toString('hex');
console.log(`ADMIN_PASS_HASH=${salt}:${hash}`);
