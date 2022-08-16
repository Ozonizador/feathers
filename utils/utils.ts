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
