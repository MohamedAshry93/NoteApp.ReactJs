import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

    async function createAccount(values) {
        return await axios.post(
            `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
            values
        );
    }

    async function Login(values) {
        return await axios.post(
            `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
            values
        );
    }

    function Logout() {
        localStorage.removeItem("userToken");
        setUserToken(null);
    }

    return (
        <UserContext.Provider
            value={{
                isLoading,
                setIsLoading,
                createAccount,
                Login,
                userToken,
                setUserToken,
                Logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
