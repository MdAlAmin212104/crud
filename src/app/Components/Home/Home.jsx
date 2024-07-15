"use client";
import { getPosts, deletePost } from "@/Api";
import { FaEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import Swal from "sweetalert2";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
            try {
                await deletePost(id);
                setPosts(posts.filter(post => post.id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        
        }
      });
    // try {
    //   await deletePost(id);
    //   setPosts(posts.filter(post => post.id !== id));
    // } catch (error) {
    //   console.error("Error deleting post:", error);
    // }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mt-6 text-2xl font-bold">
      <h1 className="">Posts</h1>
      <Link href='/create'><button className="btn text-xl font-bold">Create post</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Details</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{post.title}</td>
                <td><Link href={`/posts/${post.id}`}>Details</Link></td>
                <td><Link href={`/update/${post.id}`}><FaEdit className="text-2xl" /></Link></td>
                <td>
                  <button onClick={() => handleDelete(post.id)}>
                    <MdDelete className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
