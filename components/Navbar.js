import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setToken(true);
    } else if (!token) {
      setToken(false);
    }
  }, [token]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-400 p-6 sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Buka Buku
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white  hover:text-gray-500 mr-4"
          >
            Daftar Buku
          </Link>
          {token && (
            <Link
              href="/books/create"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
            >
              Tambah Buku
            </Link>
          )}
        </div>
        <div>
          {!token && (
            <Link
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded bg-white border-white  hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Masuk
            </Link>
          )}
          {token && (
            <button
              onClick={() => {
                Cookies.remove('token');
                window.location = '/';
              }}
              className="inline-block text-sm px-4 py-2 leading-none border rounded bg-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Keluar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
