"use client";
import { createPost } from "@/Api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  /*eslint-disable */
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title, body };
      await createPost(newPost);
      setTitle("");
      setBody("");
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title :</span>
          </label>
          <input
            ype="text"
            value={title}
            className="input input-bordered"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description :</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea textarea-bordered textarea-md w-full"
          ></textarea>
        </div>
        <button className="btn btn-primary mt-8" type="submit">
          Create
        </button>
        <button onClick={()=>router.back()} className="btn btn-primary mt-8 ml-8" type="submit">
          Back
        </button>
      </form>
    </div>
  );
};

export default page;
