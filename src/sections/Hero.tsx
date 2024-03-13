import React from "react";

function Hero({ heroData }: { heroData: any }) {
  // - hero_title
  // - hero_description
  // - hero_image

  console.log(heroData, "heroData");

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {heroData.hero_title}
            {/* Payments tool for software companies */}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {heroData.hero_description}
            {/* From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. */}
          </p>

          <a href="#" className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-base font-medium rounded-lg text-sm px-5 py-3.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Read more
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Speak to Sales
          </a>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={heroData.hero_image} alt="mockup" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
