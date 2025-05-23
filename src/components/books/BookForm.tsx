'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import LoadingSpinner from '../common/Spinner'
import { Book } from '@/types/book'

type Props = {
  onSubmit: (formData: FormData) => void
  loading?: boolean
  book: Book
}

export default function BookForm({ onSubmit, loading, book }: Props) {
  const pathname = usePathname();
  const { register, reset, handleSubmit, formState: { errors} } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      genre: "",
      url: "",
      textContent: ""
    }
  });

  
  useEffect(() => {
    if (book) {
      reset({
        title: book?.title,
        author: book?.author,
        description: book?.description,
        genre: book?.category,
        url: book.url,
        textContent: book.textContent,
      });
    }
  }, [book, reset]);
 
  const action = pathname.split("/")[3];
  const genres = [
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Science Fiction', value: 'science fiction' },
    { label: 'Mystery', value: 'mystery' },
    { label: 'Thriller / Suspense', value: 'thriller / suspense' },
    { label: 'Horror', value: 'horror' },
    { label: 'Romance', value: 'romance' },
    { label: 'Historical Fiction', value: 'historical fiction' },
    { label: 'Adventure', value: 'adventure' }
  ]

  const onHandleSubmit = (data: any) => {
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-4 max-w-lg mx-auto">
      <div>
        <Label>Title</Label>
        <Input
          {...register("title", { required: "Book title is required"})}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors?.title?.message}</p>}
      </div>
      <div>
        <Label>Author</Label>
        <Input
          {...register("author", { required: "Author name is required"})}
        />
        {errors.author && <p className="text-red-500 text-sm">{errors?.author?.message}</p>}
      </div>
      <div>
        <Label>Genre</Label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          {...register("genre", { required: "Genre is required"})} 
        >
          {genres.map((genre, index) => {
            return (
              <option key={index} value={genre.value}>{genre.label}</option>
            )
          })}
        </select>
        {errors.genre && <p className="text-red-500 text-sm">{errors?.genre?.message}</p>}
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          {...register("description", { required: "description is required"})}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors?.description?.message}</p>}
      </div>
      <div>
        <Label>Content</Label>
        <Textarea
          {...register("textContent", { required: "Content is required"})}
        />
        {errors.textContent && <p className="text-red-500 text-sm">{errors?.textContent?.message}</p>}
      </div>
      <div>
        <Label>Cover Image link</Label>
        <Input 
          type="text"
          {...register("url", { required: "Cover image is required"})}
        />
        {errors.url && <p className="text-red-500 text-sm">{errors?.url?.message}</p>}
      </div>
      <Button className='w-full' type="submit" disabled={loading}> 
        {loading ? <LoadingSpinner /> : action ==="edit" ? "Edit Book" : 'Upload Book' }
      </Button>
    </form>
  )
}
