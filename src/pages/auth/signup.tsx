import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, UserIcon } from "lucide-react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Link } from "react-router";
import { BASE_API } from "@/services/api";
import { FormField } from "@/components/ui/form";

const formSchema = z.object({
  identity: z.string().min(1, "Wajib diisi"),
  username: z.string().min(1, "Wajib diisi"),
  password: z.string().min(8).nonempty("Wajib diisi"),
  email: z.email().nonempty("Wajib diisi"),
  phone: z.string().min(1, "Wajib diisi"),
  source: z.enum(["web", "social media", "friend"]),
});

export default function SignUpPage() {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      source: "web",
    },
  });
  // state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // handle submit
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(BASE_API + "signup", data); //<- api belum tersedia :(

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start md:justify-center font-public"
      style={{
        backgroundImage: "url('/auth/art.png')",
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "250px 250px",
        // reduce opacity
        opacity: 0.9,
      }}>
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-2xl w-full max-w-6xl mx-auto bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 md:p-10 flex flex-col gap-6">
          <img src="/logo.svg" alt="logo" className="h-20 mx-auto" />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="identity"
              className="text-sm font-semibold text-zinc-600 uppercase">
              Identitas akun <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <input
                id="identity"
                {...register("identity")}
                type="text"
                className="outline-none text-sm w-full"
                placeholder="duitkas.com"
              />
              {watch("identity") === "" && (
                <span className="hidden md:block absolute right-4 text-sm text-gray-400">
                  identitas perusahaan/akun
                </span>
              )}
            </div>
            {errors.identity && (
              <span className="text-xs text-red-500">
                {errors.identity?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-zinc-600 uppercase">
              username <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <button className="flex bg-white">
                <UserIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <input
                id="username"
                {...register("username")}
                type="text"
                className="outline-none text-sm w-full"
                placeholder="username anda"
              />
            </div>
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-zinc-600 uppercase">
              Kata sandi <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <button className="flex bg-white">
                <LockKeyholeIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <input
                id="password"
                {...register("password")}
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
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-zinc-600 uppercase">
              email <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <button className="flex bg-white">
                <UserIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <input
                id="email"
                {...register("email")}
                type="text"
                className="outline-none text-sm w-full"
                placeholder="email yang dapat dihubungi"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-zinc-600 uppercase">
              nomor <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center relative">
              <button className="flex bg-white mr-3 text-xs">+62</button>
              <input
                id="phone"
                {...register("phone")}
                type="text"
                className="outline-none text-sm w-full"
                placeholder="nomor yang dapat dihubungi"
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone?.message}
              </span>
            )}
          </div>

          <FormField
            control={control}
            name="source"
            render={({ field }) => (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-zinc-600 uppercase">
                  Mengetahui duitkas dari
                </label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {["web", "social media", "friend"].map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}></FormField>

          <Button className="w-full rounded-full py-6 uppercase">Masuk</Button>
          <p className="font-domine text-center text-sm">
            Sudah punya akun ?{" "}
            <Link to="/" className="text-blue-600 underline">
              Klik disini
            </Link>
          </p>
        </form>

        <div className="hidden md:block relative m-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100 to-blue-300 rounded-2xl z-10"></div>
          <img
            src={"/auth/signup.png"}
            alt="Signup"
            className="z-20 relative object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
