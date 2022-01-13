import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
    if(req.method === 'POST') {
        const { username, email, password } = req.body;

        const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email, 
                password 
            })
        })

        const data = await strapiRes.json() // Returns 500 error

        console.log(data.jwt, 'TOKEN')

        if(strapiRes.ok) {
            // Set Cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 *24 * 7, // 1 week
                sameSite: 'strict',
                path: '/'
            }))
            res.status(200).json({user: data.user})
        } else {
            if(!username) {
                res.status(405).json({message: "Username is required to login"})
            } else if(!email) {
                res.status(405).json({message: "Email is required to login"})
            } else if(!password) {
                res.status(405).json({message: "Password is required to login"})
            } else {
                res.status(data.error.status).json({message: data.error.message})
            }
            
        }

        res.status(200).json({});
    } else {
        // res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}