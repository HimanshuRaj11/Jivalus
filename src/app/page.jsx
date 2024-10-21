import Image from "next/image";

import React from 'react';
import PostCard from '../components/PostCard';
import Homelayout from "./homelayout";

export default function Home() {



  return (
    <Homelayout>
      <div className="min-h-screen w-full">
        <PostCard />
      </div>
    </Homelayout>
  );
}