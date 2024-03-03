import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

function EventsArchive({ events }: { events: any }) {
  const [oldEvents, setOldEvents] = useState([]);

  useEffect(() => {
    const now = new Date();
    const filterOld = events.filter((event: any) => {
      // Parse saved date
      const eventDate = new Date(event.scheduled_date);
      // Check if greater than today
      return eventDate < now;
    });

    setOldEvents(filterOld);

    console.log("filterOld", filterOld);

    return () => {};
  }, [events]);

  return (
    <section
      className="bg px-4 py-8 mx-auto lg:py-16
    bg-white-transparent
  "
    >
      <div
        className=" 
     
    max-w-screen-xl px-4 py-8 mx-auto
    "
      >
        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl text-center">Projects</h2>
        <ul
          className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3
    
    "
        >
          {oldEvents.length > 0 &&
            oldEvents?.map((event: any) => {
              return <ProjectCard event={event} />;
            })}
        </ul>
      </div>
    </section>
  );
}

export default EventsArchive;
