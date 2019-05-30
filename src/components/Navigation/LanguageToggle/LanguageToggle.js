import React from 'react';
import { withLocalize } from 'react-localize-redux';
import classes from './LanguageToggle.css';

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => {
  const getClass = languageCode => {
    return languageCode === activeLanguage.code ? 'active' : '';
  };
  return (
    <div className={classes.LanguageToggle}>
      <ul className="selector">
        {languages.map(lang => (
          <li key={lang.code}>
            {lang.name === activeLanguage.name ? null : (
              <button
                className={getClass()}
                onClick={() => setActiveLanguage(lang.code)}
              >
                {lang.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withLocalize(LanguageToggle);
