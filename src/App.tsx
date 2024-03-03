import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./templates/Header";
import Hero from "./sections/Hero";
import Projects from "./pages/Projects";
import axios from "axios";
import AboutUs from "./pages/AboutUs";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import SingleProject from "./pages/SingleProject";
import { websiteURL, eventsURL } from "./config";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./templates/Footer";
import RegisterEvent from "./pages/RegisterEvent";
import EventsArchive from "./pages/EventsArchive";
import Loader from "./components/Loading";

export interface HeaderData {
  logo: string;
  logo_text: string;
}

export interface FooterData {
  logo_text: string;
  logo_image: string;
  copyrights: string;
}
export interface PageData {
  hero: {};
  aboutUs: AboutInfo;
  header: HeaderData;
  footer: FooterData;
}
export interface AboutInfo {
  about_us_description: string;
  about_us_image: string;
  about_us_title: string;
}
function App() {
  const [events, setEvents] = useState<[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<PageData>({
    aboutUs: { about_us_description: "", about_us_image: "", about_us_title: "" },
    hero: {},
    header: {
      logo: "",
      logo_text: "",
    },
    footer: {
      logo_text: "",
      logo_image: "",
      copyrights: "",
    },
  });

  console.log("pageData", pageData);

  const sectionRefAbout = useRef<HTMLDivElement>(null);
  const sectionRefProjects = useRef<HTMLDivElement>(null);

  // Step 2: Handle Click Event
  const handleSectionScroll = (sectionRef: any) => {
    // Scroll the section into view
    navigate("/");
    setTimeout(() => {
      sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const fetchMainPageData = async () => {
      const response = await axios.get(`${websiteURL}wp-json/wp/v2/pages/30`);
      console.log("about us response", response.data?.acf);
      const aboutUsDetails = response.data?.acf.about_us;
      const heroDetails = response.data?.acf.hero;
      const headerDetails = response.data?.acf.header;
      const footerDetails = response.data?.acf.footer;
      setPageData((prev) => ({ aboutUs: aboutUsDetails, hero: heroDetails, header: headerDetails, footer: footerDetails }));
      setLoading(false);
    };

    fetchMainPageData();

    return () => {};
  }, []);

  useEffect(() => {
    fetchEvents();

    return () => {};
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get(`${websiteURL}${eventsURL}`);
    console.log(response.data);
    const data = response.data;
    const eventData = data.events;
    setEvents(eventData);
  };

  useEffect(() => {
    const fetchAtendees = async () => {
      try {
        const response = await axios.get(`${websiteURL}wp-json/attendees/v1/all`);
        console.log("fetchAtendees", response.data);
      } catch (error) {
        console.error("fetchAtendees:", error);
      }
    };

    fetchAtendees();

    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header handleScroll={handleSectionScroll} aboutRef={sectionRefAbout} projectsRef={sectionRefProjects} headerData={pageData.header} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero heroData={pageData.hero} />
                  <AboutUs aboutData={pageData.aboutUs} sectionRef={sectionRefAbout} />
                  <Projects events={events} sectionRef={sectionRefProjects} />
                </>
              }
            />
            <Route path="/single-event/:id" element={<SingleProject events={events} fetchEvents={fetchEvents} />} />
            <Route path="/events-register/:id" element={<RegisterEvent />} />
            <Route path="/events-archive/" element={<EventsArchive events={events} />} />
            <Route path="/events-archive/single-event/:id" element={<SingleProject events={events} fetchEvents={fetchEvents} />} />
          </Routes>
          <Footer footerData={pageData.footer} />
        </>
      )}
    </>
  );
}

export default App;
