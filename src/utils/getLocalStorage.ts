const getLocalStorage = (value: string) => {
  const data = localStorage.getItem(value) || null;

  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};

export { getLocalStorage };
