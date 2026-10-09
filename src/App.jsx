import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderFooter from "./components/layout/HeaderFooter";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import CareerPage from "./pages/CareerPage";
import MediaPage from "./pages/MediaPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NewsArchivePage from "./pages/NewsArchivePage";

// New Pages
import ExperiencePage from "./pages/ExperiencePage";
import OffersPage from "./pages/OffersPage";
import FeedbackPage from "./pages/FeedbackPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import DestinationsPage from "./pages/DestinationsPage";
import PortfolioProjectDetailPage from "./pages/PortfolioProjectDetailPage";

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

          {/* Destinations */}
          <Route path="destinations" element={<DestinationsPage />} />
          <Route
            path="destinations/:hotelId"
            element={<ProjectDetailPage />}
          />
          <Route
            path="projects/:projectId"
            element={<PortfolioProjectDetailPage />}
          />

          {/* New Hotel Requirements */}
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="terms" element={<TermsConditionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
