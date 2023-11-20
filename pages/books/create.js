import Navbar from '@/components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const BookCreate = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    title: '',
    author: '',
    publisher: '',
    year: 0,
    pages: 0,
  });

  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, publisher, year, pages } = input;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('year', year);
    formData.append('pages', pages);
    formData.append('image', file);

    
    axios
    .post('/api/book', formData, {
      headers: {
        authorization: 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      let timerInterval
        Swal.fire({
          title: "Berhasil menambahkan buku 🎉",
          html: "Terima kasih telah berpartisipasi bersama kami!",
          timer: 3000,
          backdrop: "#FFF",
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          },
          showClass: {
            popup: `
              animate__animated
              animate__fadeInLeft
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutRight
              animate__faster
            `,
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        router.push('/');
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 1500,
        });
      });

    setInput({
      title: '',
      author: '',
      publisher: '',
      year: 0,
      pages: 0,
    });
    setFile(null);
  };

  return (
    <>
      <Navbar />
      <div className="mx-10 mt-10 mb-12 basis-4/5">
        <p className="text-3xl text-center font-bold text-indigo-400 border-b-4 border-t-4 w-fit mx-auto">
          Tambah Buku
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center mt-3 gap-3">
        <div className=''>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm text-indigo-400 font-bold"
            >
              Judul
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={input.title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block mb-2 text-sm text-indigo-400 font-bold"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={input.author}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="publisher"
              className="block mb-2 text-sm text-indigo-400 font-bold"
            >
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={input.publisher}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div>
          <div className="mb-6">
            <label
              htmlFor="year"
              className="block mb-2 text-sm text-indigo-400 font-bold"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={input.year}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="pages"
              className="block mb-2 text-sm text-indigo-400 font-bold"
            >
              Pages
            </label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={input.pages}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block mb-2 text-sm text-indigo-400 font-bold"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

export default BookCreate;
