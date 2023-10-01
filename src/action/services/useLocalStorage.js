function useLocalStorage() {
  const saveToLocalStorage = (key, value) => {
    const convertedValue = Array.isArray(value)
      ? value
      : typeof value === "object"
      ? JSON.stringify(value)
      : value;
    localStorage.setItem(key, convertedValue);

    return value;
  };

  const readFromLocalStorage = (key) => {
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

  return {
    saveToLocalStorage,
    readFromLocalStorage,
  };
}

export default useLocalStorage;
