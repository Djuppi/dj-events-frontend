import { API_URL, PER_PAGE } from '@/config/index';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import qs from 'qs';

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      <ul>
        {events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </ul>
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {

  const params = {
    pagination: {
      page: page,
      pageSize: PER_PAGE,
      withCount: true,
    },
    sort: ['date:asc']
}

// Fetch events
const query = qs.stringify(params);
  const eventRes = await fetch(`${API_URL}/api/events?${query}`);
  const events = await eventRes.json();

  return {
    props: { events: events.data, pagination: events.meta.pagination },
  }
}