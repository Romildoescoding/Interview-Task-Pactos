import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  // I have used to mock the cookies token used in authentication. Since, authentication was not the part of the required app
  // I found a workaround for that...
  useEffect(() => {
    localStorage.setItem("userEmail", userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userName, setUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};
