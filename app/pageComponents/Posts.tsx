"use client";

import { useEffect, useState } from "react";
import Post from "../components/Post";
import { PostForm } from "../components/PostForm";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}
export default function PostList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : todos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <PostForm />
          {todos.map((todo) => (
            <Post key={todo._id} />
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
