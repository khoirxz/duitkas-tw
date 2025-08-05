import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, UserIcon } from "lucide-react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signupPage, setSignupPage] = useState<boolean>(false);

  // handle change page to signup
  const handleChangePage = () => {
    setSignupPage(!signupPage);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center p-10"
      style={{
        backgroundImage: "url('/auth/art.png')",
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "250px 250px",
        // reduce opacity
        opacity: 0.9,
      }}>
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-2xl w-full max-w-6xl mx-auto bg-white">
        <form className="p-10 flex flex-col gap-6">
          <img src="/logo.svg" alt="logo" className="h-20 mx-auto" />

          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase">
              Identitas akun <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <input
                type="text"
                className="outline-none text-sm w-full"
                placeholder="duitkas.com"
              />
              <span className="absolute right-4 text-sm text-gray-400">
                identitas perusahaan/akun
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase">
              username <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <button className="flex bg-white">
                <UserIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <input
                type="text"
                className="outline-none text-sm w-full"
                placeholder="username anda"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase">
              Kata sandi <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <button className="flex bg-white">
                <LockKeyholeIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <input
                type={showPassword ? "text" : "password"}
                className="outline-none text-sm w-full"
                placeholder="password anda"
              />
              <button
                className="flex bg-white"
                type="button"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeIcon className="size-4 ml-3" color="#3B82F6" />
                ) : (
                  <EyeOffIcon className="size-4 ml-3" color="#3B82F6" />
                )}
              </button>
            </div>
          </div>

          {signupPage && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-sm font-semibold text-zinc-600 uppercase">
                email <span className="text-red-500">*</span>
              </label>
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
                <button className="flex bg-white">
                  <UserIcon className="size-4 mr-3" color="#3B82F6" />
                </button>
                <input
                  type="text"
                  className="outline-none text-sm w-full"
                  placeholder="email yang dapat dihubungi"
                />
              </div>
            </div>
          )}

          {signupPage && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-sm font-semibold text-zinc-600 uppercase">
                nomor <span className="text-red-500">*</span>
              </label>
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
                <button className="flex bg-white mr-3 text-xs">+62</button>
                <input
                  type="text"
                  className="outline-none text-sm w-full"
                  placeholder="nomor yang dapat dihubungi"
                />
              </div>
            </div>
          )}

          {signupPage && (
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="text-sm font-semibold text-zinc-600 uppercase">
                Mengetahui duitkas dari <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Sosial media</SelectItem>
                  <SelectItem value="nominal">Teman</SelectItem>
                  <SelectItem value="hybrid">
                    Google, Facebook, Instagram
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button className="w-full rounded-full py-6 uppercase">Masuk</Button>
          {signupPage ? (
            <p className="font-domine text-center text-sm">
              Sudah punya akun ?{" "}
              <span
                onClick={handleChangePage}
                className="text-blue-600 underline">
                Daftar disini
              </span>
            </p>
          ) : (
            <p className="font-domine text-center text-sm">
              Belum punya akun ?{" "}
              <span
                onClick={handleChangePage}
                className="text-blue-600 underline">
                Daftar disini
              </span>
            </p>
          )}
        </form>
        <div className="hidden md:block relative m-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100 to-blue-300 rounded-2xl z-10"></div>
          <img
            src={signupPage ? "/auth/signup.png" : "/auth/artwork.png"}
            alt="Login"
            className="z-20 relative"
          />
        </div>
      </div>
    </div>
  );
}
