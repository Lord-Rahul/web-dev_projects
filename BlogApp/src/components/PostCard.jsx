import React from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, image }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white/90 dark:bg-gray-900 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-shadow border border-blue-100/40 dark:border-gray-700 mb-2 flex flex-col items-center">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(image)}
            alt={title}
            className="rounded-xl max-h-48 object-cover shadow w-full"
          />
        </div>
        <h2 className="text-xl font-bold text-blue-700 dark:text-purple-300 mb-1 truncate text-center w-full">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
