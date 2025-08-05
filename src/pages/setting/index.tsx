import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { MailIcon, MapPin, User2Icon } from "lucide-react";
import { Link } from "react-router";

export default function SettingPage() {
  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Data Akun</h1>

          <Button
            asChild
            variant="default"
            className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 hidden md:flex">
            <Link to="/admin/settings/users">Data pengguna</Link>
          </Button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 px-8 border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-3xl">
          <div className="relative w-full col-span-2">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 rounded-sm z-10">
              Identitas Akun <span className="text-red-500">*</span>
            </label>
            <div className="border border-zinc-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <input
                type="text"
                className="outline-none text-sm"
                placeholder="duitkas.com"
              />
              <span className="absolute right-4">demo</span>
            </div>
          </div>
          <div className="relative w-full col-span-2">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 rounded-sm z-10">
              Nama pemilik akun <span className="text-red-500">*</span>
            </label>
            <div className="border border-zinc-300 rounded-full px-5.5 py-3 flex flex-row items-center relative">
              <button className="flex mr-2">
                <User2Icon className="size-4" color="#3B82F6" />
              </button>
              <input
                type="text"
                className="outline-none text-sm"
                placeholder="umay halim"
              />
            </div>
          </div>

          <div className="relative w-full">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 rounded-sm z-10">
              email <span className="text-red-500">*</span>
            </label>
            <div className="border border-zinc-300 rounded-full px-5.5 py-3 flex flex-row items-center relative">
              <button className="flex mr-2">
                <MailIcon className="size-4" color="#3B82F6" />
              </button>
              <input
                type="text"
                className="outline-none text-sm"
                placeholder="demos@duitkas.com"
              />
            </div>
          </div>
          <div className="relative w-full">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 rounded-sm z-10">
              NO. WHATSAPP <span className="text-red-500">*</span>
            </label>
            <div className="border border-zinc-300 rounded-full px-5.5 py-3 flex flex-row items-center relative">
              <input
                type="text"
                className="outline-none text-sm"
                placeholder="+62"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 col-span-2">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase">
              KETERANGAN <span className="text-red-500">*</span>
            </label>
            <div className="relative h-40 pb-3 border border-zinc-300 rounded-3xl pl-12 pr-3">
              <MapPin className="absolute top-4 left-4 size-5" />
              <textarea
                className="h-full w-full my-3 outline-none resize-none"
                placeholder="Jl. Papa Biru 3 No.5b, Tulusrejo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141"
              />
            </div>
          </div>

          <Button className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto col-span-2">
            Simpan
          </Button>
        </form>
      </div>
    </Layout>
  );
}
