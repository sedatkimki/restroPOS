import { AuthAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
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
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const RegisterFormSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  profilePhoto: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 5MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
});

export const RegisterForm = ({ phoneNumber }: { phoneNumber: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    try {
      const customerInfo = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: phoneNumber,
      });
      await AuthAPI.registerNewCustomer(customerInfo, data.profilePhoto?.[0]);
      navigate("/customer-login/otp", {
        state: { phoneNumber: phoneNumber },
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-3">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(form.watch("profilePhoto")?.[0])}
              className="h-20 w-20 rounded-full border object-cover shadow-sm flex-1"
              alt=""
            />
          ) : (
            <div className="flex flex-1 min-h-20 min-w-20 flex-wrap content-center justify-center rounded-full border shadow-sm">
              <ImageOff className="h-6 w-6  text-neutral-300" />
            </div>
          )}
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo</FormLabel>
                <FormControl>
                  <Input
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                    type="file"
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    onChange={(e) => {
                      setSelectedFile(e.target.files?.[0] || null);
                      field.onChange(e.target.files);
                    }}
                    id="profilePhoto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Ryan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Ryan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
};
