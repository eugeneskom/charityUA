// Comments.js

import React from "react";
import { SingleComment } from "../../pages/SingleProject";

interface CommentsProps {
  comments: SingleComment[];
}

const Comment = ({ post_id, author, created_at, content }: SingleComment) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4" key={created_at}>
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3 ">
          <svg className="absolute w-12 h-12 text-gray-400 -left-1 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <span className="font-semibold text-gray-800">{author}</span>
          <span className="text-gray-500 text-sm ml-4">{created_at}</span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Коментарі</h2>
      {comments.length > 0 ? comments.map((comment) => <Comment post_id={comment.post_id} author={comment.author} created_at={comment.created_at} content={comment.content} />) : <p className="text-gray-500">Покищо немає коментарів.</p>}
    </div>
  );
};

export default Comments;
