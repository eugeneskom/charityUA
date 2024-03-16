import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { extractPlainTextWithLineBreaks, scrollToTop } from "../libs";
import calendarIcon from "../assets/img/icons/calendar.svg";
import Breadcrumbs from "../components/Breadcrumbs";
import RenderHTML from "../components/RenderHTML";
import { websiteURL } from "../config";
import axios from "axios";
import Comments from "../components/comments/Comments";
import CommentForm from "../components/comments/CommentForm";
import { JWTToken } from "../App";
import TimeDisplay from "../components/TimeDisplay";

interface SingleProjectProps {
  events: [];
  fetchEvents: () => void;
  jwtToken: JWTToken;
}
// export interface CommentProps {
//   id: number;
//   name: string;
//   timestamp: string;
//   content: string;
// }

export interface SingleComment {
  post_id: string;
  author: string;
  content: string;
  created_at: string;
}

function SingleProject({ events, fetchEvents, jwtToken }: SingleProjectProps) {
  const { id } = useParams();

  console.log("events", events);
  console.log("currentEvent", id);

  const navigate = useNavigate();

  const [comments, setComments] = useState<SingleComment[]>([]);


  useEffect(() => {
    scrollToTop();
    fetchEvents();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${websiteURL}wp-json/custom/v1/get-all-comments`);
        // console.log("comments_response", response.data);
        const comments = response.data;
        const currPostComments = comments.filter((comment: SingleComment) => Number(comment.post_id) === Number(id));
        setComments(currPostComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  useEffect(() => {

    const fetchCurrentEvent = async (id: string) => {
      try {
        const response = await axios.get(`${websiteURL}wp-json/events/v1/${id}`);
        // const commentsResponse = await axios.get(`${websiteURL}wp-json/custom/v1/get-all-comments`)
        // console.log('commentsResponse',commentsResponse.data)
      } catch (error) {
        console.error("fetchCurrentEvent: ", error);
      }
    };
    if (id === undefined) return;

    // fetchCurrentEvent(id);

    return () => {};
  }, []);

  if (events.length === 0) return <h1>Loading</h1>;

  const currentEvent = events.find((event: any) => event.id == id) as any;

  if (!currentEvent) {
    return <h1>Event not found</h1>;
  }

  // console.log("currentEvent", currentEvent);
  const parsedDescription = extractPlainTextWithLineBreaks(currentEvent?.content);

  // console.log("parsedDescription", parsedDescription);
  return (
    <>
      <section
        className="max-w-5xl mx-auto mt-8 p-4 single-project
      bg-white rounded-lg shadow dark:bg-gray-900 p-4 w-full mb-6"
      >
        <Breadcrumbs currentPage="Project" />
        <h1 className="text-2xl font-bold mb-5">{currentEvent.title}</h1>
        {currentEvent.isCompleted ? (
          ""
        ) : (
          <div className="header flex gap-3">
            <NavLink
              to={`/events-register/${id}`}
              className="btn mt-3 ml-3 mb-3 bg-green-500 inline-flex items-center
      px-5 py-2.5 text-sm font-medium text-center rounded-lg hover:bg-green-700 
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600
      dark:hover:bg-blue-700 dark:focus:ring-green-800 text-white"
              // onClick={()=>navigateToRegistration(event.id)}
            >
              Прийняти участь
            </NavLink>
            <button
              className="btn mt-3 ml-3 mb-3 bg-green-500 inline-flex items-center
      px-5 py-2.5 text-sm font-medium text-center rounded-lg hover:bg-green-700 
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600
      dark:hover:bg-blue-700 dark:focus:ring-green-800 text-white"
              // onClick={()=>navigateToRegistration(event.id)}
            >
              Залишити донат
            </button>
          </div>
        )}

        <img src={currentEvent?.acf_fields.project_image || ""} alt={currentEvent.post_title} className="w-full h-48 object-cover mb-5 rounded-md" />
        <div className="flex items-end gap-3 justify-between">
          <div className="flex">
            <img src={calendarIcon} alt="" className="w-6 h-6 mr-2" />
            {/* <TimeDisplay time= /> */}
            <p>{currentEvent.acf_fields.dte}</p>
          </div>
          {/* {currentEvent.tags.map((tag: any) => {
            return <p className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">{tag.name}</p>;
          })} */}
        </div>
        <h2 className="text-lg font-bold mb-7">{currentEvent?.acf?.add_video}</h2>
        {currentEvent?.acf_fields.video_link ? (
          <div className="flex justify-start mb-7">
            <div className="relative w-4/5 md:w-2/3 lg:w-1/2">
              <video className="w-full h-full object-cover" controls src={currentEvent.video_link}>
                {/* <source src={currentEvent.video_link} type="video/mp4" /> */}
                {/* Your browser does not support the video tag. */}
              </video>
            </div>
            {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
              <h2 className="text-xl font-bold mb-2">Video Title</h2>
              <p className="text-sm">Video description goes here.</p>
            </div> */}
          </div>
        ) : (
          ""
        )}

        {<RenderHTML htmlString={currentEvent?.content} />}
        {/* <p className="mb-5">{parsedDescription}</p> */}

        <Comments comments={comments} />
        <CommentForm
          postId={Number(id)}
          jwtToken={jwtToken}
          // onCommentSubmit={onCommentSubmit }
        />
      </section>
    </>
  );
}

export default SingleProject;
