// frontend/src/components/BibleSelector.jsx
import React, { useEffect } from 'react';

// ✅ Ensure these match the actual lowercase JSON filenames (e.g., asvs.json -> 'ASVS')
const localTranslations = [
  'ASV',
  'ASVS', // was ASV2
  'Bishops',
  'Coverdale',
  'Geneva',
  'KJV',
  'KJV_Strongs',
  'NET',
  'Tyndale',
  'WEB',
];
const apiTranslations = ['NIV'];

const translationOptions = [
  ...localTranslations.map(name => ({ name, source: 'local' })),
  ...apiTranslations.map(name => ({ name, source: 'api' })),
];

console.log('🧪 BibleSelector loaded. Translations:', translationOptions);

export default function BibleSelector({ selected, onChange }) {
  useEffect(() => {
    console.log('📘 BibleSelector Mounted');
    console.log('✅ Local Translations:', localTranslations);
    console.log('🌐 API Translations:', apiTranslations);
    console.log('📚 Combined Translation Options:', translationOptions);
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`🔄 User selected translation: ${newValue}`);
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label htmlFor="translation" className="block text-sm font-medium text-gray-700 mb-1">
        Bible Translation
      </label>

      <select
        id="translation"
        value={selected}
        onChange={handleChange}
        className="w-full p-2 border rounded shadow-sm text-sm"
      >
        <option value="" disabled>
          Select a translation
        </option>
        {translationOptions.map(({ name, source }) => {
          console.log(`📝 Rendering option: ${name} (${source})`);
          return (
            <option key={name} value={name}>
              {name} {source === 'api' ? '(Online)' : ''}
            </option>
          );
        })}
      </select>
    </div>
  );
}
