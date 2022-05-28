const localStorageHelper = {
  get: key => {
    window.localStorage.getItem(JSON.parse(key));
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
