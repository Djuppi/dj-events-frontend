import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL, PER_PAGE } from '@/config/index';
import qs from 'qs';

export default function EventsPage({events, pagination}) {
  

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      <ul>
        {events.map(evt => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </ul>

          <Pagination pagination={pagination} />
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
    populate: 'image'
}

// Fetch events
const query = qs.stringify(params);
  const eventRes = await fetch(`${API_URL}/api/events?_sort=date:ASC&${query}`);
  const events = await eventRes.json();

  return {
    props: { events: events.data, pagination: events.meta.pagination },
  }
}