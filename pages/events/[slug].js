import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

export default function EventPage({evt}) {

    const deleteEvent = () => {
        console.log('delete')
    }

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href='#' className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>
                <span>
                    {evt.time} at {evt.date}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                       <Image src={evt.image} width={960} height={600} /> 
                    </div>
                )}

                <h2>Performers</h2>
                <p>{evt.performers}</p>

                <h3>Description</h3>
                <p>{evt.description}</p>

                <h4>Venue: {evt.venue}</h4>
                <p>{evt.address}</p>

                <Link href='/events'>
                    <a className={styles.back}>
                        Go Back
                    </a>
                </Link>



            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
   const res = await fetch(`${API_URL}/api/events`);

   const events = await res.json();

   const paths = events.map(evt => ({
       params: {slug: evt.slug}
   }))

   return {
       paths,
       fallback: true
   }
}

export async function getStaticProps({ params: {slug} }) {
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const events = await res.json();

    return {
        props: {
            evt: events[0]
        },
        revalidate: 1,
    }
}

// export async function getServerSideProps({ query: {slug} }) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json();

//     return {
//         props: {
//             evt: events[0]
//         }
//     }
// }