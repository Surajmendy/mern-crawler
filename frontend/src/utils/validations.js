
export const isValidUrl = (url) => {

  var pattern = /^(?:(?:http|https):\/\/)/;
  return !!pattern.test(url);
};
