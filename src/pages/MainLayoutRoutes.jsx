import React from "react";
import Home from "./Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Route, Routes } from "react-router-dom";
import DynamicPage from "./DynamicPage";
import CoursesPage from "./CoursesPage";
import TeachersPage from "./TeachersPage";
import Results from "./Results";
import Lessons from "../components/Lessons";
import ErrorPage from "./ErrorPage";
import GroupsForStudents from "./student/GroupsForStudents";

function MainLayoutRoutes() {
  return (
    <>
      <React.Fragment />
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/self-study" element={<Lessons />} />
        <Route path="/item/:id" element={<DynamicPage />} />
        <Route path="/forstudents" element={<GroupsForStudents />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
      <React.Fragment />
    </>
  );
}

export default MainLayoutRoutes;
