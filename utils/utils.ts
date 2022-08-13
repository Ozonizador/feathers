export const getCorrectUrl = (url: string) => {
  const dividedUrl = url.split("/");
  const parsedKey = dividedUrl.slice(1);

  return parsedKey.join("/");
};
