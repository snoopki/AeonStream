export const saveToLocalStorage = (key, value) => {
  let convertedValue;

  const isArray = Array.isArray(value);
  const isObject = typeof value === "object";

  switch (true) {
    case isArray:
      convertedValue = value;
      break;
    case isObject:
      convertedValue = JSON.stringify(value);
      break;
    default:
      convertedValue = value;
  }

  localStorage.setItem(key, convertedValue);
  return value;
};

export const readFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  const typeOfValue = typeof value;

  if (!value) return null;

  switch (typeOfValue) {
    case "boolean":
      return value === "true";
    case "number":
      return +value;
    case "object":
      return JSON.parse(value);
    default:
      return value;
  }
};
