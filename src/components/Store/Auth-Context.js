import React, { useEffect, useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: ()=>{},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect with empty [] depandancies, will run the useEffect one time after the component rendering
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("IsLoggedIn");
        if (storedUserLoggedInInformation === "1") {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem("IsLoggedIn");
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem("IsLoggedIn", "1");
        setIsLoggedIn(true)
    }
    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;