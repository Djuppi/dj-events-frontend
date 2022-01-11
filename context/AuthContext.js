import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

const AuthContex = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);


    // Register User
    const register = async (user) => {
        console.log(user)
    }

    // Login User
    const login = async ({email:identifier, password}) => {
        console.log({identifier, password})
    }

    // Logout User
    const logout = async () => {
        console.log('Logout')
    }

    // Check if user is logged in
    const CheckUserLogginIn = async (user) => {
        console.log('Check')
    }

    return (
        <AuthContex.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContex.Provider>
    )
};

export default AuthContex;