"use client";

import { useState } from "react";
import type { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import img from "../../../../../public/images/forgetPassword.png";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const token = params?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields", { position: "top-center", duration: 3000 });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-center", duration: 3000 });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/reset-password", {
        token,
        password,
      });

      toast.success(res.data.message || "Password updated successfully", {
        position: "top-center",
        duration: 3000,
      });
      router.push("/admin/login");
    } catch (error) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center", duration: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center overflow-hidden w-full max-w-6xl shadow-lg rounded-2xl bg-white">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#1d4ed8] mb-6 text-center">Reset Admin Password</h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your new password to complete the reset process.
          </p>

          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="text-gray-700 font-semibold">New Password</label>
              <Input
                type="password"
                className="mt-2"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 font-semibold">Confirm Password</label>
              <Input
                type="password"
                className="mt-2"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#1d4ed8] hover:bg-blue-700 text-white py-2 text-lg rounded-xl shadow-md transition duration-300 cursor-pointer disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>

        <div className="hidden md:flex w-1/2 justify-center items-center">
          <Image className="rounded-xl object-contain" width={400} height={400} alt="illustration" src={img} />
        </div>
      </div>
    </div>
  );
}
