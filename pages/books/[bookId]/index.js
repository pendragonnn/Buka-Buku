import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
const prisma = new PrismaClient();

const Book = ({ book }) => {
  const router = useRouter();

  const handleDelete = async (event) => {
    const bookId = parseInt(event.target.value);
      Swal.fire({
        title: "Yakin ingin menghapus?",
        text: "Peringatan: Data akan hilang selamanya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, saya yakin!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Data Terhapus!",
            text: "Data telah berhasil dihapus.",
            icon: "success",
          });
          axios.delete(`/api/book/${bookId}`, {
            headers: { authorization: "Bearer " + Cookies.get("token") },
          });
          router.push("/");
        }
      });
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <p className="text-3xl text-center font-bold my-5 border-b-4 border-t-4 w-56 mx-auto text-indigo-400">
        Detail Buku
      </p>
      <div
        id="card-detail"
        className="flex flex-col items-start p-5 mb-12 min-w-fit mx-auto bg-white rounded  md:flex-row md:max-w-md"
      >
        <Image
          src={`/uploads/${book.image}`}
          alt="Book Image"
          className="object-cover w-100 h-96 max-w-md mr-4"
          width={240}
          height={100}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="text-2xl font-bold tracking-tight text-indigo-400">
            {book.title}
          </h5>
          <p className="mb-4 text-sm text-gray-400">{book.author}</p>
          <p className="text-sm text-gray-700">Publisher:</p>
          <p className="mb-3 text-sm text-gray-400 text-justify">
            {book.publisher}
          </p>
          <p className="text-sm text-gray-700">Year:</p>
          <p className="mb-3 text-sm text-gray-400 text-justify">{book.year}</p>
          <p className="text-sm text-gray-700">Pages:</p>
          <p className="mb-10 text-sm text-gray-400 text-justify">
            {book.pages}
          </p>
          {Cookies.get("token") && (
            <div>
              <Link href={`/books/${book.id}/edit`}>
                <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-indigo-500 rounded-md hover:bg-indigo-600 mr-1">
                  Edit
                </button>
              </Link>
              <button
                value={book.id}
                onClick={handleDelete}
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { bookId: "1" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const data = await prisma.book.findUnique({
    where: {
      id: parseInt(params.bookId),
    },
  });

  return {
    props: {
      book: data,
    },
    revalidate: 10,
  };
};
