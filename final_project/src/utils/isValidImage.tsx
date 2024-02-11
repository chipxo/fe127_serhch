export const isValidImage = (url: string) => {
  const img = new Image();
  img.src = url;
  return img.complete && img.width > 0 && img.height > 0;
};
