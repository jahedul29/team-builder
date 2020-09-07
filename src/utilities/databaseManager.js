const getUser = () => {
  const existingUser = sessionStorage.getItem("userId");
  if (existingUser) {
    return existingUser;
  } else {
    const newUser = "user-" + new Date().getTime();
    sessionStorage.setItem("userId", newUser);
    return newUser;
  }
};

const getDataKey = () => {
  const userId = getUser();
  return `teambuilder/saved/${userId}`;
};

// push to local storage: a temporary place for database
// getDatabaseCart
const getSavedMembersFromDatabase = () => {
  const dataKey = getDataKey();
  const data = localStorage.getItem(dataKey) || "{}";
  return JSON.parse(data);
  // return Object.values(savedMembers);
};

const addRequestedMemberToDatabase = (key, requested) => {
  const currentSavedMembers = getSavedMembersFromDatabase();
  currentSavedMembers[key] = requested;
  localStorage.setItem(getDataKey(), JSON.stringify(currentSavedMembers));
};

const removeRequestedMemberFromDatabase = (key) => {
  const currentSavedMembers = getSavedMembersFromDatabase();
  delete currentSavedMembers[key];
  localStorage.setItem(getDataKey(), JSON.stringify(currentSavedMembers));
};

// const processOrder = (cart) => {
//     localStorage.removeItem(getDataKey());
// }

export {
  addRequestedMemberToDatabase,
  getSavedMembersFromDatabase,
  removeRequestedMemberFromDatabase,
};

// polyfill to support older browser
const localStorage =
  window.localStorage ||
  (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();

const sessionStorage =
  window.sessionStorage ||
  (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();
// end of poly fill
