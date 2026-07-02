import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-2 py-1 rounded border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="fr">Français (FR)</option>
        <option value="en">English (EN)</option>
        <option value="es">Español (ES)</option>
        <option value="ar">العربية (AR)</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
