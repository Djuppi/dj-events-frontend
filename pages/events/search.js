import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import GoBack from '@/components/Back';
import EventItem from '@/components/EventItem';
import qs from 'qs';

export default function SearchPage({events}) {
    const router = useRouter();

    return (
        <Layout title='Search Results'>
        <GoBack href={'/events'} />
        <h1>Search Results for {router.query.term}</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        <ul>
            {events.map(evt => (
            <EventItem key={evt.id} evt={evt} />
            ))}
        </ul>
        </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
    const params = {
        filters: {
            $or: [
                {
                    name: {
                        '[$contains]': term
                    }
                },
                {
                    performers: { 
                        '[$contains]': term
                    }
                },
                {
                    description: { 
                        '[$contains]': term
                    }
                },
                {
                    venue: { 
                        '[$contains]': term
                    }
                }
            ]
            
        },
        populate: 'image'
    }

    const query = qs.stringify(params)

    const res = await fetch(`${API_URL}/api/events?${query}`);
    const events = await res.json();

    return {
        props: { events: events.data },
    }
}