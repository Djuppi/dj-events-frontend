import { API_URL } from '@/config/index';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';

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

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=image`);
  const events = await res.json();
  return {
    props: { events: events.data },
    revalidate: 1,
  }
}