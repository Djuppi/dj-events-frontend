import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

export default function Search() {
    const [term, setTerm] = useState('');

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const href = `/events/search?term=${term}`
        router.push(href);
        setTerm('');
    }
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder='Search Events'
                />
            </form>
        </div>
    )
}