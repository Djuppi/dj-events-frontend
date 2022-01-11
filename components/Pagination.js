import Link from 'next/link';


export default function Pagination({pagination}) {
    const { page, pageCount, total } = pagination;
    const lastPage = pageCount;
    return (
        <>
            {page > 1 && (
        <Link href={`/events?page=${page-1}`} >
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page+1}`} >
          <a className="btn-secondary">Next</a>
        </Link>
      )}
        </>
    )
}
