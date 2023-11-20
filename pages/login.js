import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import Image from "next/image";

const Login = () => {
  const router = useRouter();

  const [input, setInput] = useState({
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
    axios
      .post("/api/login", { email: input.email, password: input.password })
      .then((res) => {
        Cookies.set("token", res.data.token);
        Swal.fire({
          title: "Login Berhasil",
          html: "Selamat menikmati layanan yang kami sediakan!",
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
        router.push("/");
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
        <div className="w-50 lg:flex items-center justify-between p-8">
          <Image
            src="/login.png"
            width={400}
            height={400}
            alt="Login picture"
            style={{objectFit:"contain"}}
          />
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight inline text-indigo-800">
              Masuk
            </h2>
            <h2 className="ml-2 inline text-3xl">
              Ke Akun Anda!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Atau{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                daftar di sini
              </Link>
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className=" rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-t-md border border-indigo-300 rounded-lg py-3 px-4 text-gray-900 my-2"
                    placeholder="Email address"
                    value={input.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Kata Sandi
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full rounded-b-md border border-indigo-300 rounded-lg py-3 px-4 text-gray-900 "
                    placeholder="Password"
                    value={input.password}
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
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
