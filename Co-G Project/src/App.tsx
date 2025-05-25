import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TipsPage from "./pages/TipsPage";
import VideosPage from "./pages/VideosPage";
import ArticlesPage from "./pages/ArticlesPage";
import QuotesPage from "./pages/QuotesPage";
import TrackerPage from "./pages/TrackerPage";
import LifestylePage from "./pages/LifestylePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient} data-id="ovhh9b85s" data-path="src/App.tsx">
      <TooltipProvider data-id="u3sqca0aq" data-path="src/App.tsx">
        <AuthProvider data-id="muj52knbl" data-path="src/App.tsx">
          <Toaster data-id="gaeydwe6k" data-path="src/App.tsx" />
          <BrowserRouter data-id="16svqh6gr" data-path="src/App.tsx">
            <Routes data-id="3sk638pgh" data-path="src/App.tsx">
              <Route path="/" element={<Layout data-id="425c8a2io" data-path="src/App.tsx" />} data-id="10ij6wggm" data-path="src/App.tsx">
                <Route index element={<HomePage data-id="evecab9o2" data-path="src/App.tsx" />} data-id="2cag0nhfn" data-path="src/App.tsx" />
                <Route path="tips" element={<TipsPage data-id="wfu6qgsw0" data-path="src/App.tsx" />} data-id="tseypp30r" data-path="src/App.tsx" />
                <Route path="videos" element={<VideosPage data-id="b6s1c1a2h" data-path="src/App.tsx" />} data-id="b3matxukf" data-path="src/App.tsx" />
                <Route path="articles" element={<ArticlesPage data-id="lrogvhd7l" data-path="src/App.tsx" />} data-id="enue1oupz" data-path="src/App.tsx" />
                <Route path="quotes" element={<QuotesPage data-id="i6xjv2uk4" data-path="src/App.tsx" />} data-id="dbq35tnf4" data-path="src/App.tsx" />
                <Route path="tracker" element={<TrackerPage data-id="hfa5sk0df" data-path="src/App.tsx" />} data-id="lhj747uhs" data-path="src/App.tsx" />
                <Route path="lifestyle" element={<LifestylePage data-id="axulqu0ze" data-path="src/App.tsx" />} data-id="07s6jxat4" data-path="src/App.tsx" />
                <Route path="contact" element={<ContactPage data-id="iridx7iln" data-path="src/App.tsx" />} data-id="9hg84bmtd" data-path="src/App.tsx" />
                <Route path="login" element={<LoginPage data-id="2axvzqlxa" data-path="src/App.tsx" />} data-id="bq5gl5x54" data-path="src/App.tsx" />
                <Route path="register" element={<RegisterPage data-id="kykbuo6ge" data-path="src/App.tsx" />} data-id="xpt4e6l4o" data-path="src/App.tsx" />
              </Route>
              <Route path="*" element={<NotFound data-id="nouy2u2z0" data-path="src/App.tsx" />} data-id="3gh1tn7zf" data-path="src/App.tsx" />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>);

};

export default App;