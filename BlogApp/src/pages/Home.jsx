import React, { useEffect, useState } from "react";
import appwriteservice from "../appwrite/config.js";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteservice.listPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center items-center min-h-[300px]">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-blue-700 mb-2">No posts yet</h1>
              <p className="text-gray-500">Login or create an account to start reading and writing posts!</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Home;
