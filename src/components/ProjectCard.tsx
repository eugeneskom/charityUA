import React from "react";
import { extractPlainTextWithLineBreaks } from "../libs";
import calendarIcon from "../assets/img/icons/calendar.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { websiteURL } from "../config";
import axios from "axios";

interface ProjectCardProps {
  event: any;
  status?: "completed" | "upcoming";
}

function ProjectCard({ event, status }: ProjectCardProps) {
  const navigate = useNavigate();
  const parsedDescription = extractPlainTextWithLineBreaks(event?.content);
  console.log('ProjectCard', event)
  function shortenText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  function removeLinksAndTags(inputString: string) {
    // Remove HTML tags
    const withoutTags = inputString.replace(/<\/?[^>]+(>|$)/g, "");

    // Remove links
    const withoutLinks = withoutTags.replace(/http(s)?:\/\/\S+/g, "");

    return withoutLinks;
  }

  // Example usage
  const shortenedDescription = shortenText(parsedDescription, 130);
  const removedLinksDescription = removeLinksAndTags(shortenedDescription);

  //fake form data =
  const fakeFormData = {
    name: "Eugene",
    email: "85rk9521@gmail.com",
    related_event_id: 86,
  };
  async function fetchRegister(formData: any) {
    const resp = await axios.post(`${websiteURL}wp-json/api/register-attendee`, formData);
    // console.log("fetchRegister", resp.data);
  }

  const handleRegister = async () => {
    fetchRegister(fakeFormData);
    // const response = await axios.post(`${websiteURL}wp-json/wp/v2/tribe_tpp_attendees`, fakeFormData);
    // console.log("handleRegister", response.data);
  };

  const navigateToRegistration = (id: string) => {
    navigate(`/events-register/${id}`);
  };

  // console.log("status", status);

  return (
    <li key={event.id} className="bg-white p-4 rounded-lg shadow-md ">
      <img src={event.acf_fields.project_image} alt={event.title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      {/* <h2 className="text-xl font-bold mb-5">{event?.acf?.add_video}</h2> */}
      <p className="mb-5">{removedLinksDescription}</p>
      <p className="flex mb-5">
        <img src={calendarIcon} alt="" />
        <p className="ml-3">{event.acf_fields.date}</p>
      </p>

      {/* <div className="flex"> */}
        <NavLink
          to={`single-project/${event.id}`}
          rel="noopener noreferrer"
          className="mr-3 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Докладніше
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </NavLink>
        {status !== "completed" ? (
          <NavLink
            to={`/events-register/${event.id}`}
            className="btn mt-3  bg-green-600 inline-flex items-center
    px-5 py-2.5 text-sm font-medium text-center rounded-lg hover:bg-green-700 
    focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-800
    dark:hover:bg-blue-700 dark:focus:ring-green-800 text-white"
            // onClick={()=>navigateToRegistration(event.id)}
          >
            Прийняти участь
          </NavLink>
        ) : (
          ""
        )}
      {/* </div> */}
    </li>
  );
}

export default ProjectCard;
