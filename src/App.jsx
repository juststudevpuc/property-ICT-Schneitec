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
import AdminLayout from "./components/layout/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import PropertiesAdminPage from "./pages/admin/PropertiesAdminPage";
import PropertyFormPage from "./pages/admin/PropertyFormPage";
import ProjectsAdminPage from "./pages/admin/ProjectsAdminPage";
import ProjectFormPage from "./pages/admin/ProjectFormPage";
import NewsAdminPage from "./pages/admin/NewsAdminPage";
import NewsFormPage from "./pages/admin/NewsFormPage";
import InboxAdminPage from "./pages/admin/InboxAdminPage";
import MediaAdminPage from "./pages/admin/MediaAdminPage";
import OffersAdminPage from "./pages/admin/OffersAdminPage";
import OfferFormPage from "./pages/admin/OfferFormPage";
import ExperiencesAdminPage from "./pages/admin/ExperiencesAdminPage";
import ExperienceFormPage from "./pages/admin/ExperienceFormPage";
import CareersAdminPage from "./pages/admin/CareersAdminPage";
import CareerFormPage from "./pages/admin/CareerFormPage";
import SettingsAdminPage from "./pages/admin/SettingsAdminPage";
import AboutAdminPage from "./pages/admin/AboutAdminPage";
import TeamFormPage from "./pages/admin/TeamFormPage";
import AwardFormPage from "./pages/admin/AwardFormPage";

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
          <Route path="destinations/:hotelId" element={<ProjectDetailPage />} />
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

        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ADMIN CMS ROUTES (Protected by AdminLayout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <div>
                Welcome to the Admin Dashboard. Select a module from the
                sidebar.
              </div>
            }
          />
          <Route path="properties" element={<PropertiesAdminPage />} />
          <Route path="properties/create" element={<PropertyFormPage />} />
          <Route path="properties/:id/edit" element={<PropertyFormPage />} />
          <Route path="projects" element={<ProjectsAdminPage />} />
          <Route path="projects/create" element={<ProjectFormPage />} />
          <Route path="projects/:id/edit" element={<ProjectFormPage />} />
          <Route path="news" element={<NewsAdminPage />} />
          <Route path="news/create" element={<NewsFormPage />} />
          <Route path="news/:id/edit" element={<NewsFormPage />} />
          <Route path="inbox" element={<InboxAdminPage />} />
          <Route path="media" element={<MediaAdminPage />} />

          <Route path="offers" element={<OffersAdminPage />} />
          <Route path="offers/create" element={<OfferFormPage />} />
          <Route path="offers/:id/edit" element={<OfferFormPage />} />

          {/* Placeholder routes for the other new sidebar links so they don't break */}
          <Route path="experiences" element={<ExperiencesAdminPage />} />
          <Route path="experiences/create" element={<ExperienceFormPage />} />
          <Route path="experiences/:id/edit" element={<ExperienceFormPage />} />
          <Route path="careers" element={<CareersAdminPage />} />
          <Route path="careers/create" element={<CareerFormPage />} />
          <Route path="careers/:id/edit" element={<CareerFormPage />} />
          <Route path="about" element={<AboutAdminPage />} />
          <Route path="about/team/create" element={<TeamFormPage />} />
          <Route path="about/team/:id/edit" element={<TeamFormPage />} />
          <Route path="about/awards/create" element={<AwardFormPage />} />
          <Route path="about/awards/:id/edit" element={<AwardFormPage />} />
          <Route path="settings" element={<SettingsAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
