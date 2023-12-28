"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validation";
import { saveUsers } from "@/lib/actions";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("onSubmit is called with values:", values);
    try {
      // Create a new user
      setIsLoading(true);
      console.log("clicked to submit");

      const user = await saveUsers(values);
      if (user) {
        console.log(`file: page.tsx:41 ~ user:`, user);
        setIsLoading(false);
      }
      console.log("User created successfully");
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <main className="flex items-center max-h-screen justify-center p-10">
      <Form {...form}>
        <div className="sm:w-420 flex-center justify-between flex-col md:flex-row">
          {/* Image */}
          <img src="/assets/images/signUp.svg" className="md:w-1/2" />
          <form
            id="signUpForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-2"
          >
            <h2 className="h3-hold md:h2-bold pt-5 sm:pt-8">Log In Account</h2>
            <p className="text-light-3 small-medium md:base-regular mt-1">
              Please Sign in to continue your journey
            </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" type="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nialabs@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Your Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Number" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }: any) => {
                return (
                  <FormItem>
                    <FormLabel>Password confirm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password confirm"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <p className=" text-start mt-2 ">
              Don't have account ?{" "}
              <Link href={"./sign-in"} className="text-blue-500 font-bold">
                Sign In
              </Link>
            </p>

            <Button type="submit" className="w-full">
              {isLoading ? "Creating..." : "Submit"}
            </Button>
          </form>
        </div>
      </Form>
    </main>
  );
};

export default SignUp;
