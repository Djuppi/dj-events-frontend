import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({evt: {attributes}, evt}) {
    
    const image = attributes.image.data ? attributes.image.data.attributes.formats.thumbnail.url : '/images/event-default.png';
    return (
        <li className={styles.event}>
            <div className={styles.img}>
                <Image src={image ? image : '/images/event-default.png'} width={170} height={100} />
            </div>

            <div className={styles.info}>
                <span>
                    {new Date(attributes.date).toLocaleDateString('da-DK')} at {attributes.time}
                </span>
                <h3>{attributes.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/events/${attributes.slug}`}>
                    <a className='btn'>Details</a>
                </Link>
            </div>
        </li>
    )
}
