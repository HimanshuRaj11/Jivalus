import Image from "next/image";

import React from 'react';
import PostCard from '../components/PostCard';
import Homelayout from "./homelayout";

export default function Home() {
  const post = {
    user: {
      profileImage: 'https://via.placeholder.com/150',
      name: 'John Doe',
      username: '@johndoe',
    },
    description: 'This is a sample post description.',
    image: 'https://via.placeholder.com/600',
    likes: 120,
    comments: 45,
  };



  return (
    <Homelayout>
      <div className="min-h-screen w-full">
        <PostCard {...post} />
      </div>
    </Homelayout>
  );
}