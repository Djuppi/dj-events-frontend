import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function GoBack({href}) {
    return (
        <Link href={href}>
            <a>
                <FaArrowLeft /> Go Back
            </a>
        </Link>
    )
}