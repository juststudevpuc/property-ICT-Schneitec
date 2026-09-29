import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderFooter from "./components/layout/HeaderFooter";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import CareerPage from "./pages/CareerPage";
import MediaPage from "./pages/MediaPage";
import ContactPage from "./pages/ContactPage";
import AllProject from "./pages/AllProject";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NewsArchivePage from "./pages/NewsArchivePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderFooter />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="media/news" element={<NewsArchivePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="all-projects" element={<AllProject />} />
          <Route path="projects/:projectId" element={<ProjectDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}