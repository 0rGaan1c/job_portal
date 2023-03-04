const minLengthErrorMessage = (characterLength, name) => {
  return `${name} needs to more than ${characterLength} characters.`;
};

const maxLengthErrorMessage = (characterLength, name) => {
  return `${name} can't be more than ${characterLength} characters.`;
};

const requiredErrorMessage = (name) => {
  return `${name} is required.`;
};

module.exports = {
  minLengthErrorMessage,
  maxLengthErrorMessage,
  requiredErrorMessage,
};
