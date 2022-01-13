import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
    if(req.method === 'GET') {
        if(!req.headers.cookie) {
            res.status(403).json({message: 'Not Authorized'});
            return;
        }

        const { token } = cookie.parse(req.headers.cookie);

        const strapieRes = await fetch(`${API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = await strapieRes.json();

        if(strapieRes.ok) {
            res.status(200).json({user})
        } else {
            res.status(403).json({message: 'User Forbidden'})
        }
    } else {
        // res.setHeader('Allow', ['GET'])
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}