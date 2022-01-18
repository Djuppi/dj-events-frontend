import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

import ReactDom from 'react-dom';
import styles from '@/styles/Modal.module.css';

export default function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => setIsBrowser(true), []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
                {title && <h1>{title}</h1>}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;


    if(isBrowser) {
        return ReactDom.createPortal(modalContent, document.getElementById('modal-root'))
    } else {
        return null;
    } 
}

// https://devrecipes.net/modal-component-with-next-js/