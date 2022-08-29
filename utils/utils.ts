export const getCorrectUrl = (url: string) => {
  const dividedUrl = url.split("/");
  const parsedKey = dividedUrl.slice(1);

  return parsedKey.join("/");
};

export const dateToFormat = (date: Date) => {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

/* unique word */
export const createRandomUniqWord = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Debounce function
export const debounceFn = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
