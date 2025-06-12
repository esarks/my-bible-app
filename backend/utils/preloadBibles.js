// utils/preloadBibles.js
import fs from 'fs';
import path from 'path';

export function loadBibles(biblesDir) {
  const bibles = {};
  console.log(`📦 Starting to load Bible files from directory: ${biblesDir}`);

  const files = fs.readdirSync(biblesDir);

  if (files.length === 0) {
    console.warn('⚠️ No files found in Bible directory.');
  }

  files.forEach(file => {
    const filePath = path.join(biblesDir, file);

    if (!file.endsWith('.json')) {
      console.log(`📁 Skipping non-JSON file: ${file}`);
      return;
    }

    const translationKey = file.replace('.json', '').toLowerCase();
    console.log(`🔍 Processing file: ${file} → translationKey: ${translationKey}`);

    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(raw);

      if (!Array.isArray(data.verses)) {
        console.warn(`⚠️ File ${file} does not contain a 'verses' array`);
        return;
      }

      const books = [...new Set(data.verses.map(v => v.book_name))];
      console.log(`✅ Loaded ${translationKey}: ${data.verses.length} verses across ${books.length} books`);
      console.log(`📚 Books in ${translationKey}: ${books.slice(0, 5).join(', ')}${books.length > 5 ? ', ...' : ''}`);

      bibles[translationKey] = data;
    } catch (error) {
      console.error(`❌ Failed to load or parse ${file}:`, error.message);
    }
  });

  console.log(`🧾 Finished loading Bibles. Total loaded: ${Object.keys(bibles).length}`);
  return bibles;
}
