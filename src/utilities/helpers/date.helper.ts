// TODO use i18n to identify the language
export const formatDate = (date: Date, locale = 'en-GB') => {
  const origin = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(origin);
};
