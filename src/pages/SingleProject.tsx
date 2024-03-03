import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { extractPlainTextWithLineBreaks, scrollToTop } from "../libs";
import calendarIcon from "../assets/img/icons/calendar.svg";
import Breadcrumbs from "../components/Breadcrumbs";
import RenderHTML from "../components/RenderHTML";

interface SingleProjectProps {
  events: [];
  fetchEvents: () => void;
}

function SingleProject({ events, fetchEvents }: SingleProjectProps) {
  const { id } = useParams();

  console.log("events", events);
  console.log("currentEvent", id);

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    scrollToTop();
    fetchEvents();

    return () => {};
  }, []);

  if (events.length === 0) return <h1>Loading</h1>;

  const currentEvent = events.find((event: any) => event.id == id) as any;

  if (!currentEvent) {
    return <h1>Event not found</h1>;
  }

  console.log("currentEvent", currentEvent);
  const parsedDescription = extractPlainTextWithLineBreaks(currentEvent?.description);

  console.log("parsedDescription", parsedDescription);
  return (
    <>
      <section
        className="max-w-4xl mx-auto mt-8 p-4 single-project
      bg-white rounded-lg shadow dark:bg-gray-900 p-4"
      >
        <Breadcrumbs currentPage="Project" />
        <h1 className="text-2xl font-bold mb-5">{currentEvent.title}</h1>
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
        <img src={currentEvent?.image?.url || ""} alt={currentEvent.title} className="w-full h-48 object-cover mb-5 rounded-md" />
        <div className="flex items-end gap-3 justify-between">
          <div className="flex">
            <img src={calendarIcon} alt="" className="w-6 h-6 mr-2" />
            <p>{currentEvent.date}</p>
          </div>
          {currentEvent.tags.map((tag: any) => {
            return <p className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">{tag.name}</p>;
          })}
        </div>
        <h2 className="text-lg font-bold mb-5">{currentEvent?.acf?.add_video}</h2>

        {<RenderHTML htmlString={currentEvent?.description} />}
        <p className="mb-5">{parsedDescription}</p>
      </section>
    </>
  );
}

export default SingleProject;
