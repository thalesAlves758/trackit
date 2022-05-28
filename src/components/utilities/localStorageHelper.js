const localStorageHelper = {
  get: key => {
    return JSON.parse(window.localStorage.getItem(key));
  },
  set: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove: key => {
    window.localStorage.removeItem(key);
  },
  clearAll: () => {
    window.localStorage.clear();
  }
};

export default localStorageHelper;
