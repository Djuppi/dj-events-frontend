import { parseCookies } from '@/helpers/index';
import { ToastContainer, toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';
import Layout from '@/components/Layout';
import GoBack from '@/components/Back';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import styles from '@/styles/Form.module.css';

export default function EditEventsPage({evt, id, token}) {
    const [values, setValues] = useState({
            name: evt.name,
            performers: evt.performers,
            venue: evt.venue,
            address: evt.address,
            date: evt.date,
            time: evt.time,
            description: evt.description,
        });

    const [imagePreview, setImagePreview] = useState(evt.image.data ? evt.image.data.attributes.formats.thumbnail.url: null);
    const [showModal, toggleModal] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        const hasEmptyFields = Object.values(values).some((el) => el === '');
        if(hasEmptyFields) {
            toast.error('Please fill in all fields')
        } 
        let data = {data: {...values}}


        data.data.date = new Date(data.data.date).toISOString();

        const res = await fetch(`${API_URL}/api/events/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if(!res.ok) {
            if(res.status === 403 || res.status === 401) {
                toast.error('Unauthorized!');
                return;
            }
            toast.error("Couldn't add event");
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.data.attributes.slug}`)
        }
    }

    const imageUploaded = async () => {
        const res = await fetch(`${API_URL}/api/events/${id}?populate=image`)
        const data = await res.json();
        setImagePreview(data.data.attributes.image.data.attributes.formats.thumbnail.url)
        toggleModal(false);
        toast.success('Uploaded!')
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues({...values, [name]: value})
        
    }
    
    return (
        <Layout title='Edit Event'>
            <GoBack href='/events' />
            <h1>Edit event</h1>
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

                <input type='submit' value='Update Event' className='btn' />
            </form>
            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ) : (
                <div>
                    <p>No image uploaded</p>
                </div>
            )}

            <div>
                <p>
                    <button className="btn-secondary" onClick={() => toggleModal(true)}>
                        <FaImage /> Set image
                    </button>
                </p>
            </div>

            <Modal show={showModal} onClose={() => toggleModal(false)}>
                <ImageUpload evtId={id} imageUploaded={imageUploaded} token={token} />
            </Modal>
        </Layout>
    )
};

export async function getServerSideProps({ params: {id}, req}) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/api/events/${id}?populate=image`)
    const event = await res.json();

    return {
        props: { evt: event.data.attributes, id: event.data.id, token }
    }
};