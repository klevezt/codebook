"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { postSchema } from "../zod/schemas";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function PostForm({
  onAdd,
}: {
  onAdd: (values: z.infer<typeof postSchema>) => Promise<void>;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: "",
      tags: [],
      image: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };
  const removeTag = (tag: string) => setTags((prev) => prev.filter((el) => el !== tag));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onAdd({ ...values, tags });
          form.reset();
          setPreview("");
          setTags([]);
        })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="space-y-8"
        encType="multipart/form-data"
      >
        <Card>
          <CardHeader className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="ring-ring ring-2">
                <AvatarImage
                  src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                  alt="Avatar"
                />
                <AvatarFallback className="text-xs">PG</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <CardTitle className="flex items-center gap-1 text-sm">Klev Dev</CardTitle>
                <CardDescription>@klevdev</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <AspectRatio ratio={16 / 9}>
              <div className="flex items-center justify-center w-full h-full">
                {!preview ? (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-primary-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <input
                          className="hidden"
                          id="image"
                          type="file"
                          {...field}
                          value={field.value?.fileName}
                          onChange={(event) => {
                            handleFileChange(event);
                            field.onChange(event.target.files?.[0] ?? "");
                          }}
                        />
                      )}
                    />
                  </label>
                ) : (
                  <div>
                    <Button
                      size="sm"
                      className="absolute right-0 top-0 z-10 rounded-full"
                      onClick={() => setPreview("")}
                    >
                      <X />
                    </Button>
                    <Image src={preview} alt="Preview" fill objectFit="contain" />
                  </div>
                )}
              </div>
            </AspectRatio>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description" className="max-h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Add tag and hit enter"
                    value={tagValue}
                    onChange={(e) => setTagValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setTags((prev) => [...prev, tagValue]);
                        setTagValue("");
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    variant="secondary"
                    className="flex justify-between items-center text-md "
                    key={tag}
                  >
                    {tag}
                    <span className="hover:cursor-pointer text-md" onClick={() => removeTag(tag)}>
                      <X size="12" />
                    </span>
                  </Badge>
                ))}
              </div>
            </>
            <Button size="sm" type="submit">
              New Post
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
