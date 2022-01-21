import { ToastContainer } from 'react-toastify';
import { parseCookies } from "@/helpers/index";
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';

import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import styles from '@/styles/Event.module.css';

export default function EventPage({evt: {attributes, id}, userEvents}) {
    
    const isMyEvent = userEvents.some(evt => evt.id === id);

    const router = useRouter();

    const deleteEvent = async (id) => {
        if(confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            const data = await res.json()
    
            if(!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/events')
            }
        }
    }

    const image = attributes.image.data ? attributes.image.data.attributes.formats.medium.url : '/images/event-default.png';

    return (
        <Layout>
            <div className={styles.event}>
                {isMyEvent && <div className={styles.controls}>
                    <Link href={`/events/edit/${id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href='#' className={styles.delete} onClick={() => deleteEvent(id)}>
                        <FaTimes /> Delete Event
                    </a>
                </div>}
                <span>
                {new Date(attributes.date).toLocaleDateString('da-DK')} at {attributes.time}
                </span>
                <h1>{attributes.name}</h1>
                <ToastContainer />
                    <div className={styles.image}>
                       <Image src={image ? image : '/images/event-default.png'} width={960} height={600} /> 
                    </div>

                <h2>Performers</h2>
                <p>{attributes.performers}</p>

                <h3>Description</h3>
                <p>{attributes.description}</p>

                <h4>Venue: {attributes.venue}</h4>
                <p>{attributes.address}</p>

                <EventMap evt={attributes} />

                <Link href='/events'>
                    <a className={styles.back}>
                        Go Back
                    </a>
                </Link>
            </div>
        </Layout>
    )
};

// export const getStaticPaths = async () => {
//    const res = await fetch(`${API_URL}/api/events`);

//    const events = await res.json();

//    const paths = events.data.map(evt => ({
//        params: {slug: evt.attributes.slug}
//    }))

//    return {
//        paths,
//        fallback: true
//    }
// };

// export const getStaticProps= async ({ params: {slug} }) => {
    
//     const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}`);
//     const events = await res.json();

//     return {
//         props: {
//             evt: events.data[0],
//         },
//         revalidate: 1,
//     }
// };

export const getServerSideProps= async ({ query: {slug}, req }) => {
    const { token } = parseCookies(req)

    const userRes = await fetch(`${API_URL}/api/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    const userData = await userRes.json()
    
    const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events.data[0],
            userEvents: userData.events
        },
    }
};
