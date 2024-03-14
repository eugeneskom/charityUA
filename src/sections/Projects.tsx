import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import Swiper from "react-id-swiper";
import "swiper/swiper-bundle.css";
interface ProjectsProps {
  events: [];
  sectionRef: any;
}

const params = {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
};
function Projects({ events, sectionRef }: ProjectsProps) {

  console.log('Projects',events)
  return (
    <section
      ref={sectionRef}
      className="bg px-2 py-8  lg:py-16
      bg-white-transparent mb-10 overflow-hidden
    "
    >
      <ul
        className="max-w-screen-xl mx-auto"
      >
        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl text-center mt-0">Projects</h2>

        <Swiper {...params}>
          {events?.map((event: any) => (
            <div key={event.id}>
              <ProjectCard event={event} />
            </div>
          ))}
        </Swiper>
      </ul>
    </section>
  );
}

export default Projects;
