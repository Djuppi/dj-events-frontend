import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function EventsPage({events}) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      <ul>
        {events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=image`);
  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  }
}