const fs = require('fs');
const path = require('path');

const DIR = process.env.DATA_DIR || __dirname;
const FILE = path.join(DIR, 'bookings.json');
const MAX_KEPT = 2000; // keep the newest N bookings so spam can't fill the disk

function read() {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function write(data) {
  fs.mkdirSync(DIR, { recursive: true });
  const trimmed = data.slice(-MAX_KEPT);
  const tmp = FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(trimmed, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, FILE); // atomic swap — no half-written file
}

module.exports = { read, write };
