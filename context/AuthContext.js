import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

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
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier, 
                password 
            })
        })

        const data = await res.json()

        console.log(data)

        if(res.ok) {
            setUser(data.user)
        } else {
            setError(data.message)
            setError(null)
        }
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