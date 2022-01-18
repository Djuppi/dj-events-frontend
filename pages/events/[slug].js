import { parseCookies } from '@/helpers/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

export default function EventPage({evt: {attributes, id}, evt}) {

    const router = useRouter();

    const image = attributes.image.data ? attributes.image.data.attributes.formats.medium.url : '/images/event-default.png';

    return (
        <Layout>
            <div className={styles.event}>
                {/*<div className={styles.controls}>
                    <Link href={`/events/edit/${id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href='#' className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>*/}
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
   const res = await fetch(`${API_URL}/api/events?populate=image`);

   const events = await res.json();

   const paths = events.data.map(evt => ({
       params: {slug: evt.attributes.slug}
   }))

   return {
       paths,
       fallback: true
   }
}

export const getStaticProps= async ({ params: {slug}, req }) => {
    const res = await fetch(`${API_URL}/api/events?populate=image&filters[slug][$eq]=${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events.data[0],
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