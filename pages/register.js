import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

const Register = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput({ ...input, [name]: value });
  };

  let timerInterval;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = input;
    axios
      .post("/api/register", { name, email, password })
      .then(() => {
        Swal.fire({
          title: "Daftar Berhasil",
          html: "Silahkan masuk terlebih dahulu untuk menikmati layanan kami!",
          timer: 2000,
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
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <div className="flex w-screen min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-100 lg:flex items-center justify-between p-8">
          <Image
            src="/register.png"
            width={400}
            height={400}
            alt="Register picture"
            style={{ objectFit: "contain" }}
          />

          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-indigo-800">
              Daftar
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Atau{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sudah punya akun
              </Link>
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="relative block w-full rounded-lg border-0 py-3 px-4 text-gray-900 my-2"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full border-0 py-3 px-4 text-gray-900 my-2 rounded-lg"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full rounded-lg border-0 py-3 px-4 text-gray-900 my-2"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
