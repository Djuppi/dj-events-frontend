import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContex = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [userEvents, setUserEvents] = useState(null);

    const router = useRouter();

    useEffect(() => CheckUserLogginIn(), [])


    // Register User
    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()

        if(res.ok) {
            
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }
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

        const data = await res.json();

        if(res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }
    }

    // Logout User
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })

        if(res.ok) {
            setUser(null);
            router.push('/')
        }
    }

    // Check if user is logged in
    const CheckUserLogginIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if(res.ok) {
            setUser(data.user.user);
            setUserEvents(data.user.events);
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContex.Provider value={{user, userEvents, error, register, login, logout, CheckUserLogginIn}}>
            {children}
        </AuthContex.Provider>
    )
};

export default AuthContex;