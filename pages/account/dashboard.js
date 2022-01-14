import { parseCookies } from "@/helpers/index"
import Layout from "@/components/Layout"
import DashboardEvent from "@/components/DashboardEvent"
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';

export default function dashboardPage({user, events}) {
    
    
    const deleteEvent = (id) => {
        console.log(id)
    }
    return (
        <Layout title="User dashboard">
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>{user.username}'s Events</h3>

                {events.map((evt) => {
                    return(
                        <DashboardEvent evt={evt} key={evt.id} handleDelete={deleteEvent} />
                    )
                })}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/api/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json();

    return {
        props: { user: data.user, events: data.events }
    }
}
