const crypto = require('crypto');

export function generateUsername() {
  const bytes = crypto.randomBytes(6);
  const username = bytes.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
    .toLowerCase();
  return username;
}