import { createContext } from "react";

export const AppComponent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
  };


  return (
    <AppComponent.Provider value={{ value }}>
      {props.children}
    </AppComponent.Provider>
  );
};
