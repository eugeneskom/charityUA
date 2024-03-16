// CommentForm.js

import React, { useEffect, useState } from "react";
import { websiteURL } from "../../config";
import axios from "axios";
// const token = localStorage.getItem('token')
import { JWTToken } from "../../App";
interface CommentFormProps {
  postId: number;
  jwtToken: JWTToken;
  // onCommentSubmit: (comment: CommentProps) => void;
}
const CommentForm = ({ postId, jwtToken }: CommentFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            `${websiteURL}wp-json/custom/v1/add-comment/`,
            // `${websiteURL}wp-json/wp/v2/comments`,
            {
                post_id: postId, // Specify the post ID here
                author_name: name,
                author_email: email,
                content: content,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        console.log("handleSubmitComment", response.data);
    } catch (error) {
        console.error("handleSubmit", error);
    }
};

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     try {
  //       const response = await axios.get(`${websiteURL}wp-json/wp/v2/users/me`, {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       });
    
  //       // Log the user data for debugging
  //       console.log('Authenticated User:', response.data);
  //     } catch (error) {
  //       console.error('Authentication Check Error:', error);
  //     }
  //   };
    
  //   // Call the authentication check function before posting the comment
  //   checkAuthentication();
  
  //   return () => {
      
  //   }
  // }, [])
  

  return (
    <form onSubmit={handleSubmit} className="max-w  mt-8 p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" required />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" required />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Comment:
        </label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" required />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Залишити коментар
      </button>
    </form>
  );
};

export default CommentForm;
