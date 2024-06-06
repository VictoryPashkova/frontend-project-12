import leo from 'leo-profanity';

const cleanBadWords = (text) => {
  leo.loadDictionary('ru');
  const cleanRuText = leo.clean(text);
  leo.loadDictionary('en');
  const cleanText = leo.clean(cleanRuText);
  return cleanText;
};

export default cleanBadWords;
