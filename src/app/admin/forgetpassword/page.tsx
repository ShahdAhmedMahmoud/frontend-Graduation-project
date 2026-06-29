"use client";

import React, { useState } from "react";
import type { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import img from "../../../../public/images/forgetPassword.png";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { forgetSchema, forgetSchemaType } from "@/schema/forget.schema";

export default function AdminForgetPasswordPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const form = useForm<forgetSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgetSchema),
  });

  async function handleForget(values: forgetSchemaType) {
    try {
      await axios.post(`http://localhost:5000/api/admin/forgot-password`, values);
      setShowModal(true);
    } catch (error) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center overflow-hidden w-full max-w-6xl shadow-lg rounded-2xl bg-white">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#1d4ed8] mb-6 text-center">Admin Forgot Password</h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your admin email and we will send you a link to reset your password.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForget)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                    <div className="relative">
                      <i className="fa-solid fa-envelope absolute left-3 top-3 text-gray-500"></i>
                      <FormControl>
                        <Input
                          type="email"
                          className="pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                          placeholder="admin@example.com"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 bg-[#1d4ed8] hover:bg-blue-700 text-white py-2 text-lg rounded-xl shadow-md transition duration-300 cursor-pointer"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>

        <div className="hidden md:flex w-1/2 justify-center items-center">
          <Image className="rounded-xl object-contain" width={400} height={400} alt="illustration" src={img} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 flex flex-col items-center gap-4 shadow-xl max-w-sm w-full mx-4">
            <div className="bg-green-500 rounded-full p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Check your email</h3>
            <p className="text-gray-500 text-center">We&apos;ve sent a password reset link to your admin email</p>
            <Button
              onClick={() => router.push("/admin/login")}
              className="w-full bg-[#1d4ed8] hover:bg-blue-700 text-white py-2 rounded-xl"
            >
              Back to Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
