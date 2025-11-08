import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <div>
      {[1, 2, 3, 4].map((post, i) => (
        <Post key={i} Post={post} />
      ))}
    </div>
  );
};

export default Posts;
