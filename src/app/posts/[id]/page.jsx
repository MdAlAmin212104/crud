'use client';
import { getPostById } from '@/Api';
import React, { useEffect, useState } from 'react';

const page = ({params}) => {
    /* eslint-disable */
  const { id } = params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = await getPostById(id);
          setPost(post);
        } catch (error) {
          console.error(`Error fetching post with id ${id}:`, error);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;
    return (
        <div className='m-4 container mx-auto'>
            <h1 className='text-2xl font-bold'>title : {post.title}</h1>
            <p>description : {post.body}</p>
        </div>
    );
};

export default page;