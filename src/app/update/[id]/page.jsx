"use client";
import { getPostById, updatePost } from "@/Api";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  /* eslint-disable */
  const { id } = params;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = await getPostById(id);
          setTitle(post.title);
          setBody(post.body);
        } catch (error) {
          console.error(`Error fetching post with id ${id}:`, error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { title, body };
      await updatePost(id, updatedPost);
      alert("Post updated successfully!");
    } catch (error) {
      console.error(`Error updating post with id ${id}:`, error);
      alert("Failed to update post.");
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Edit Post</h1>
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
            required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description :</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea textarea-bordered textarea-md w-full"></textarea>
        </div>
        <button className="btn btn-primary mt-8" type="submit">Update</button>
      </form>
    </div>
  );
};

export default page;
