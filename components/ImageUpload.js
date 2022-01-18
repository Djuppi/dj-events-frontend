import { useState } from 'react';
import { API_URL } from '@/config/index';
import { toast } from 'react-toastify';

import styles from '@/styles/Form.module.css'; 

export default function ImageUpload({evtId, imageUploaded, token}) {
    
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        console.log(image)
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'api::event.event');
        formData.append('refId', evtId);
        formData.append('field', 'image');
        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        if(res.ok) {
            imageUploaded();
        } else {
            toast.error("Couldn't upload image");
        }

    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input className="btn" type="submit" value="Upload" />
            </form>
        </div>
    )
}
