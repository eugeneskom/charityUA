import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
interface ProjectsProps {
  events: [];
  sectionRef: any;
}
function Projects({ events, sectionRef }: ProjectsProps) {
  return (
    <section
      ref={sectionRef}
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
          {events?.map((event: any) => {
            return <ProjectCard event={event} />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
