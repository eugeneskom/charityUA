import React, { useRef } from "react";
import { AboutInfo } from "../App";
interface AboutUsProps {
  aboutData: AboutInfo;
  sectionRef: null | any
}

function AboutUs({ aboutData, sectionRef }: AboutUsProps) {
  const title = aboutData.about_us_title;
  const description = aboutData.about_us_description;
  const aboutImageUrl = aboutData.about_us_image;
  // about us keys
  // - about_us_description
  // - about_us_image
  // - about_us_title




  return (
    <section id="about" className="relative bg-white overflow-hidden mt-16 mb-16" ref={sectionRef}>
      {/* { max-w-7xl mx-auto } */}
      <div className="
     
      max-w-screen-xl px-4 py-8 mx-auto
      ">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100"></polygon>
          </svg>

          <div className="pt-1"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">{title}</h2>

              <p>
                {description}
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 my-9">
        <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src={aboutImageUrl} alt="" />
      </div>
    </section>
  );
}

export default AboutUs;
