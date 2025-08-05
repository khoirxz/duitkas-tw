import { Button } from "@/components/ui/button";
import { EyeIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-2 shadow-lg rounded-2xl w-full max-w-6xl mx-auto">
        <form className="p-10 flex flex-col gap-4">
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
              <span className="absolute right-4 text-sm text-gray-400">
                identitas perusahaan/akun
              </span>
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
                <UserIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <input
                type="password"
                className="outline-none text-sm w-full"
                placeholder="password anda"
              />
              <button className="flex bg-white" type="button">
                <EyeIcon className="size-4 ml-3" color="#3B82F6" />
              </button>
            </div>
          </div>

          <Button className="w-full rounded-full py-6 uppercase">Masuk</Button>
          <p className="font-domine text-center text-sm">
            Belum punya akun ?{" "}
            <Link to="/auth/register" className="text-blue-600 underline">
              Daftar disini
            </Link>
          </p>
        </form>
        <h1>Hero image</h1>
      </div>
    </div>
  );
}
