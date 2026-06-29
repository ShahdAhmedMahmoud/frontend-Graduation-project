
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
import { toast } from "sonner"
import Image from "next/image";
import img from "../../../../public/images/8cae05ec50530020d89a8356ed13b8b95e6b305f.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/register.schema";
import { registerSchemaType } from "@/schema/register.schema";
import axios from "axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";


export default function Register() {
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    resolver: zodResolver(registerSchema)
  });
  
  
  async function hamdleRegister(values: registerSchemaType) {
    console.log(values);
    try {
      const res = await axios.post(`http://localhost:5000/api/professors/signup`, {
        name: values.full_name,
        email: values.email,
        password: values.password,
      });

      console.log("res", res);
      if (res.data.message === "Professor registered successfully") {
        toast.success("You Registered Successfully", { position: "top-center", duration: 3000 });
        router.push("/doctor/login");
      }
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : "Registration failed";

      console.log("Registration error:", message);
      toast.error(message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center overflow-hidden w-full max-w-6xl shadow-lg rounded-2xl bg-white">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#1d4ed8] mb-6 text-center">
            Sign Up as Doctor
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(hamdleRegister)} className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                    <div className="relative">
                      <i className="fa-solid fa-user absolute left-3 top-3 text-gray-500"></i>
                      <FormControl>
                        <Input
                          className="pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Confirm Password</FormLabel>
                    <div className="relative">
                      <i className="fa-solid fa-lock absolute left-3 top-3 text-gray-500"></i>
                      <FormControl>
                        <Input
                          type="password"
                          className="pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                          placeholder="Re-enter your password"
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
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/doctor/login" className="text-blue-600 hover:underline">
              Log In
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
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
