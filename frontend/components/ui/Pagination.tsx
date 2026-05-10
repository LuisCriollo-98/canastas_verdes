import Link from "next/link";

function Pagination({
  page,
  totalPages,
  baseUrl,
  extraQuery = "",
}: {
  page: number;
  totalPages: number;
  baseUrl: string;
  extraQuery?: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`${baseUrl}?page=${page - 1}${extraQuery}`}
          className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`${baseUrl}?page=${currentPage}${extraQuery}`}
          className={`${page === currentPage ? "font-black" : ""} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`${baseUrl}?page=${page + 1}${extraQuery}`}
          className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}

export default Pagination;
