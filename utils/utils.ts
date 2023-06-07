export const dateToFormat = (date: Date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

/* unique word */
export const createRandomUniqWord = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatDate = (date: Date) => {
  if (!date) return "";

  const newDate = new Date(date);
  return newDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const group = (items: any[], n: number) =>
  items.reduce((acc, x, i) => {
    const idx = Math.floor(i / n);
    acc[idx] = [...(acc[idx] || []), x];
    return acc;
  }, []);

export const averageOfArrayNumbers = (arr: number[]) => {
  var result = arr.reduce((start, end, index, array) => start + end / array.length, 0);
  return result;
};

export const isNumeric = (num: any) => {
  return !isNaN(num);
};
