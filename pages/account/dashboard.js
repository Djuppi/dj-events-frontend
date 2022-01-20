import { parseCookies } from "@/helpers/index";
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

import Layout from "@/components/Layout"
import Link from "next/link";
import DashboardEvent from "@/components/DashboardEvent"
import styles from '@/styles/Dashboard.module.css';

export default function dashboardPage({user, events, token}) {
    
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
    
    return (
        <Layout title="User dashboard">
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.length > 0 ? events.map((evt) => {
                    return(
                        <DashboardEvent evt={evt} key={evt.id} handleDelete={deleteEvent} />
                    )
                }) : (
                    <>
                        <h4>No events yet</h4>
                        <Link href='/events/add'>
                            <a>Add Event</a>
                        </Link>
                    </>
                )}
            </div>
        </Layout>
    )
};

export async function getServerSideProps({req}) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/api/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json();
    console.log(data)

    return {
        props: { user: data.user, events: data.events, token }
    }
};
