import React, { createContext, useContext, useMemo } from 'react';
import leo from 'leo-profanity';

const BadWordsContext = createContext();

export const useBadWordsContext = () => useContext(BadWordsContext);

export const BadWordsProvider = ({ children }) => {
  const cleanBadWords = useMemo(() => (text) => {
    leo.loadDictionary('ru');
    const cleanRuText = leo.clean(text);
    leo.loadDictionary('en');
    const cleanText = leo.clean(cleanRuText);
    return cleanText;
  }, []);

  const contextValue = useMemo(() => ({ cleanBadWords }), [cleanBadWords]);

  return (
    <BadWordsContext.Provider value={contextValue}>
      {children}
    </BadWordsContext.Provider>
  );
};
