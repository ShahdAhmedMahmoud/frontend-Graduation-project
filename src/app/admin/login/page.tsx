
"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import img from "../../../../public/images/b4533ba5a7fb1dcbd8ae4dd68e6ceddda942747f.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";


export default function Login() {
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  });
  
  
  async function hamdleLogin(values: loginSchemaType) {
    console.log(values);

    const response = await signIn("admin-credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/admin/admindashboard"
    });
    console.log("response", response);

    if (response?.ok) {
      toast.success("You loged in Successfully", { position: "top-center", duration: 3000 });
      window.location.href = "/admin/admindashboard";
    } else {
      toast.error(response?.error || "Login failed", { position: "top-center", duration: 3000 });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center overflow-hidden w-full max-w-6xl shadow-lg rounded-2xl bg-white">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#1d4ed8] mb-6 text-center">
            Login as Admin
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(hamdleLogin)} className="space-y-6">
              {/* Email */}
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
                          placeholder="xxxxx@gmail.com"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                    <div className="relative">
                      <i className="fa-solid fa-lock absolute left-3 top-3 text-gray-500"></i>
                      <FormControl>
                        <Input
                          type="password"
                          className="pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
                            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-blue-600" />
                  Remember me
                </label>
                <a
                  href="/admin/forgetpassword"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-[#1d4ed8] hover:bg-blue-700 text-white py-2 text-lg rounded-xl shadow-md transition duration-300 cursor-pointer"
              >
                Login
              </Button>
            </form>
          </Form>

          <div className="text-center mt-4 text-gray-600">
            Dont have an account?{" "}
            <a href="/admin/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 justify-center items-center ">
          <Image
            className="rounded-xl object-contain"
            width={400}
            height={400}
            alt="Register illustration"
            src={img}
          />
        </div>
      </div>
    </div>
  );
}

