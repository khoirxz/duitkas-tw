import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, UserIcon } from "lucide-react";

import { useAuthStore } from "@/store/useAuth";
import type { ResponseProps } from "@/types/response";
import type { LoginSuccessResponse } from "@/types/auth";

import { apiAuth } from "@/services/api";

const loginFormSchema = z.object({
  identity: z.string().nonempty("Wajib diisi"),
  username: z.string().min(1, "Wajib diisi"),
  password: z.string().min(3, "Wajib diisi"),
});

export default function LoginPage() {
  // form
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identity: "",
      username: "",
      password: "",
    },
  });
  // state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  // useEffect
  useEffect(() => {
    // jika user sudah login, redirect ke dashboard
    if (useAuthStore.getState().isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  });
  // handle submit
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const formData = new FormData();

      formData.append("identitas", data.identity); // identity
      formData.append("username", data.username); // username
      formData.append("password", data.password); // password

      const { data: response } = await apiAuth.post<LoginSuccessResponse>(
        "login",
        formData
      );
      useAuthStore.getState().setAuth(response.data.token, {
        name: response.data.perusahaan.nama_direktur,
        company: response.data.perusahaan.id_perusahaan,
        role: response.data.user.role,
        id: response.data.user.id_user,
      });
      toast.success("Login berhasil!", {
        description: `Selamat datang, ${response.data.perusahaan.nama_direktur}`,
        position: "top-center",
        duration: 1500,
        icon: "🚀",
      });
      // redirect to dashboard after 2 seconds
      // todo: refactor soon using react router
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 2000);
      // console.log(response);
    } catch (e) {
      const error = e as AxiosError;
      interface ErrResponseProps extends ResponseProps {
        data: null;
      }
      const errorData = error.response?.data as ErrResponseProps | undefined;

      if (errorData) {
        toast.error(errorData.message, {
          position: "top-center",
          duration: 1500,
          icon: "🤚",
        });
      }
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
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-lg md:rounded-2xl w-full max-w-6xl mx-auto bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 md:p-10 flex flex-col gap-6 min-h-screen md:min-h-auto">
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
              <span className="flex bg-white">
                <UserIcon className="size-4 mr-3" color="#3B82F6" />
              </span>
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
              <span className="flex bg-white">
                <LockKeyholeIcon className="size-4 mr-3" color="#3B82F6" />
              </span>
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
                  <EyeOffIcon className="size-4 ml-3" color="#3B82F6" />
                ) : (
                  <EyeIcon className="size-4 ml-3" color="#3B82F6" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>

          <Button
            className="w-full rounded-full py-6 uppercase cursor-pointer"
            type="submit">
            Masuk
          </Button>

          <p className="font-domine text-center text-sm">
            Belum punya akun ?{" "}
            <Link to="/auth/signup" className="text-blue-600 underline">
              Daftar disini
            </Link>
          </p>
        </form>

        <div className="hidden md:block relative m-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100 to-blue-300 rounded-2xl z-10"></div>
          <img
            src={"/auth/artwork.png"}
            alt="Login"
            className="z-20 relative"
          />
        </div>
      </div>

      <Toaster richColors={true} />
    </div>
  );
}
