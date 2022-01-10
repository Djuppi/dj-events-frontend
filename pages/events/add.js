import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import GoBack from '@/components/Back';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function AddEventsPage() {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        const hasEmptyFields = Object.values(values).some((el) => el === '');
        if(hasEmptyFields) {
            toast.error('Please fill in all fields')
        } 
        console.log(JSON.stringify(values))

        const res = await fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }, {})

        console.log(res.json())

        if(!res.ok) {
            toast.error("Couldn't add event");
        } else {
            const evt = await res.json()
            console.log(evt)
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues({...values, [name]: value})
    }

    
    return (
        <Layout title='Add new Event'>
            <GoBack href='/events' />
            <h1>Add event</h1>
            <ToastContainer />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={values.name} 
                        onChange={(e) => handleInputChange(e)} 
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                            <input
                                type='text'
                                name='performers'
                                id='performers'
                                value={values.performers}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                            <input
                                type='text'
                                name='venue'
                                id='venue'
                                value={values.venue}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                            <input
                                type='text'
                                name='address'
                                id='address'
                                value={values.address}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                            <input
                                type='date'
                                name='date'
                                id='date'
                                value={values.date}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                            <input
                                type='text'
                                name='time'
                                id='time'
                                value={values.time}
                                onChange={handleInputChange}
                            />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                        <textarea
                            type='text'
                            name='description'
                            id='description'
                            value={values.description}
                            onChange={handleInputChange}
                        />
                </div>

                <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    )
}
