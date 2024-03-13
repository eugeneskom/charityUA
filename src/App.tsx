import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./templates/Header";
import Hero from "./sections/Hero";
import Projects from "./pages/Projects";
import axios from "axios";
import AboutUs from "./pages/AboutUs";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import SingleProject from "./pages/SingleProject";
import { websiteURL, eventsURL } from "./config";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./templates/Footer";
import RegisterEvent from "./pages/RegisterEvent";
import ProjectsArchive from "./pages/ProjectsArchive";
import Loader from "./components/Loading";
import SuccessPage from "./pages/SuccessPage";
import ContactPage from "./pages/ContactPage";
import { parseApiResponse } from "./libs";
export interface HeaderData {
  logo: string;
  logo_text: string;
}

export interface FooterData {
  logo_text: string;
  logo_image: string;
  copyrights: string;
}
export interface ContactUsData {
  title: string;
  address: string;
  description: string;
  email: string;
  facebook: string;
  instagramm: string;
  twitter: string;
  phone: string;
}

export interface PageData {
  hero: {};
  aboutUs: AboutInfo;
  header: HeaderData;
  footer: FooterData;
  contactUs: ContactUsData;
}
export interface AboutInfo {
  about_us_description: string;
  about_us_image: string;
  about_us_title: string;
}

export type JWTToken = string | null;
function App() {
  const [events, setEvents] = useState<[]>([]);
  const jwt: string | null = localStorage.getItem("token");
  const [jwtToken, setJwtToken] = useState<string | null>(jwt);
  const [urlToLogin, setUrlToLogin] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState<[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<PageData>({
    aboutUs: { about_us_description: "", about_us_image: "", about_us_title: "" },
    hero: {},
    header: {
      logo: "",
      logo_text: "",
    },
    contactUs: {
      title: "",
      address: "",
      description: "",
      email: "",
      facebook: "",
      instagramm: "",
      twitter: "",
      phone: "",
    },
    footer: {
      logo_text: "",
      logo_image: "",
      copyrights: "",
    },
  });
  const sectionRefAbout = useRef<HTMLDivElement>(null);
  const sectionRefProjects = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const pathname = location.pathname;
  console.log("pageData", pageData);


  // Step 2: Handle Click Event
  const handleSectionScroll = (sectionRef: any) => {
    // Scroll the section into view
    navigate("/");
    setTimeout(() => {
      sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const handleScrollTop = () => {
      // Scroll the section into view
      setTimeout(() => {
        window.scrollTo(0,0)
        // sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };
    handleScrollTop()
  
    return () => {
      
    }
  }, [pathname])
  

  useEffect(() => {
    const fetchMainPageData = async () => {
      try {
        // const response = await axios.get(`${websiteURL}wp-json/wp/v2/pages/30`, {
        const response = await axios.get(`${websiteURL}my-json-cache-api.php?endpoint=main-page`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
 
        // Parse the cleaned string as JSON
        const parsedData = parseApiResponse(response.data);
        
        
        if (parsedData.status) {
          // Request was successful
          console.log(parsedData.message);
          console.log(parsedData.data);
          const aboutUsDetails = parsedData.data.about_us;
          const heroDetails = parsedData.data.hero;
          const headerDetails = parsedData.data.header;
          const footerDetails = parsedData.data.footer;
          const contactUsDetails = parsedData.data.contact_us;
          setPageData({ aboutUs: aboutUsDetails, hero: heroDetails, header: headerDetails, footer: footerDetails, contactUs: contactUsDetails });
          setLoading(false);
        } else {
          // Request failed
          console.error(parsedData.message);
        }
 
      } catch (error) {
        console.error("FetchMainPageData: ", error);
      }
    };

    fetchMainPageData();

    return () => {};
  }, []);

  useEffect(() => {
    fetchEvents();

    return () => {};
  }, []);

  const fetchEvents = async () => {
    // const response = await axios.get(`${websiteURL}${eventsURL}`);
    try {
      // const response = await axios.get(`${websiteURL}wp-json/events/v1/all-events`, {
      const response = await axios.get(`${websiteURL}my-json-cache-api.php?endpoint=events`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log("fetchEvents", response.data);
      const parsedData = parseApiResponse(response.data)

      if (response.status) {
        const events = parsedData.data;
        console.log('fetchEvents_events',events)
        setEvents(events);
        const now = new Date();
        const upcomingEvents = events.filter((event: any) => {
          // Parse saved date
          const eventDate = new Date(event.acf_fields.date);
          // Check if greater than today
          return eventDate > now;
        });
        setUpcomingEvents(upcomingEvents);

        console.log("upcomingEvents", upcomingEvents);
      }
    } catch (error) {
      console.error("fetchEvents: ", error);
    }
  };

  useEffect(() => {
    const fetchAtendees = async () => {
      try {
        const response = await axios.get(`${websiteURL}wp-json/attendees/v1/all`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log("fetchAtendees", response.data);
      } catch (error) {
        console.error("fetchAtendees:", error);
      }
    };

    const login = async () => {
      const urlRegister = `${websiteURL}wp-json/custom/v1/register-user/`;
      // const urlRegister = `${websiteURL}wp-json/wp/v2/users`;

      const urlToken = `${websiteURL}wp-json/jwt-auth/v1/token`;

      const credentials = {
        username: "Eugene awdSKom",
        email: "85rkawd9521@gmail.com",
        password: "password",
        // event_id: 117
      };

      try {
        const regResponse = await axios.post(urlRegister, credentials);
        console.log("regResponse", regResponse.data);

        const response = await axios.post(urlToken, credentials);

        console.log("response", response.data);

        localStorage.setItem("token", response.data.token);
      } catch (error) {}
    };

    const getMainPageJSON = async () => {
      const response = await axios.get(`${websiteURL}my-json-cache-api.php?endpoint=main-page`);
      console.log('getMainPageJSON',response.data)
    }
    getMainPageJSON()

    // login()

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

                  {events.length > 0 ? <Projects events={upcomingEvents} sectionRef={sectionRefProjects} /> : <h1>No upcoming events</h1>}
                </>
              }
            />
            <Route path="/success-page/:id" element={<SuccessPage />} />
            <Route path="/single-project/:id" element={<SingleProject events={events} fetchEvents={fetchEvents} jwtToken={jwtToken} />} />
            <Route path="/events-register/:id" element={<RegisterEvent jwtToken={jwtToken} />} />
            <Route path="/projects-archive" element={<ProjectsArchive events={events} />} />
            <Route path="/projects-archive/single-project/:id" element={<SingleProject events={events} fetchEvents={fetchEvents} jwtToken={jwtToken} />} />
            <Route path="/contact" element={<ContactPage contactUsDetails={pageData.contactUs}/>} />
          </Routes>
          <Footer aboutRef={sectionRefAbout} projectsRef={sectionRefProjects} footerData={pageData.footer} handleScroll={handleSectionScroll} />
        </>
      )}
    </>
  );
}

export default App;
