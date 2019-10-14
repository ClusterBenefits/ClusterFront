export default char => value => {
  const number = `${value}`.replace(/[^\d]/gim, "");
  let formattedValue = "";
  for (let i = 0; i < number.length; i += 1) {
    formattedValue += (char[i] || "") + number[i];
  }
  return formattedValue;
};
