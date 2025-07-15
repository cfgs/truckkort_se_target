"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Namnet måste vara minst 2 tecken långt.",
  }),
  email: z.string().email({
    message: "Ange en giltig e-postadress.",
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "Meddelandet måste vara minst 10 tecken långt.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      // For now, we'll just simulate a submission
      const { name, email, message } = data;

      const modifiedParams = new URLSearchParams({
        name,
        email,
        message: `Intresse för webbplattsförvärv truckkort.se: \n\n${message}`,
      }).toString();

      const url = `https://sndr.se/send/contact-form-service?${modifiedParams}`;

      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error("Något gick fel vid skickandet av formuläret.");
      }

      console.log("Form data:", data);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tack för ditt meddelande!
            </h3>
            <p className="text-gray-600 mb-4">
              Vi har tagit emot din förfrågan och återkommer inom 24 timmar.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Skicka nytt meddelande
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Kontakta oss
        </CardTitle>
        <p className="text-center text-gray-600">
          Fyll i formuläret nedan så återkommer vi med prisförslag och mer
          information.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-xl">
                    Namn *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ditt fullständiga namn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-xl">
                    E-post *
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="din@email.se" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-xl">
                    Meddelande *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berätta om dina planer för domänerna, din budget och eventuella frågor..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-xl cursor-pointer"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Skickar...
                </>
              ) : (
                "Skicka förfrågan"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
