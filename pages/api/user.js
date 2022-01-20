import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
    if(req.method === 'GET') {
        if(!req.headers.cookie) {
            res.status(403).json({message: 'Not Authorized'});
            return;
        }

        const { token } = cookie.parse(req.headers.cookie);

        const strapiRes = await fetch(`${API_URL}/api/events/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = await strapiRes.json();

        if(strapiRes.ok) {
            res.status(200).json({user})
        } else {
            console.log(strapiRes)
            res.status(403).json({message: 'User Forbidden'})
        }
    } else {
        // res.setHeader('Allow', ['GET'])
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}