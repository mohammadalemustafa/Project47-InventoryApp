import { createContext, useState } from "react";

export const AllContext = createContext({
  isLoggedIn: false,
  login: (email, pass) => {},
  logout: () => {},
});

const AllContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email, pass) => {
    if (email && pass) {
      setIsLoggedIn(true);
      return;
    } else {
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };

  return <AllContext.Provider value={value}>{children}</AllContext.Provider>;
};

export default AllContextProvider;
