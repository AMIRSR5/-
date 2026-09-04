import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteSettingsProvider, useSiteSettings } from "./useSiteSettings.tsx";
import { ToastProvider } from "./useToast.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import AdminLayout from "./AdminLayout.tsx";
import Home from "./Home.tsx";
import Shop from "./Shop.tsx";
import ProductDetail from "./ProductDetail.tsx";
import About from "./About.tsx";
import Contact from "./Contact.tsx";
import NotFound from "./NotFound.tsx";
import AdminLogin from "./AdminLogin.tsx";
import ProtectedRoute from "./AdminProtectedRoute.tsx";
import Dashboard from "./AdminDashboard.tsx";
import AdminProducts from "./AdminProducts.tsx";
import ProductForm from "./AdminProductForm.tsx";
import AdminCategories from "./AdminCategories.tsx";
import AdminSettings from "./AdminSettings.tsx";
import AdminFeedback from "./AdminFeedback.tsx";
import { setSiteSeo } from "./seo.ts";

function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const { settings } = useSiteSettings();
  useEffect(() => {
    setSiteSeo(settings);
  }, [settings]);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <SiteSettingsProvider>
        <ToastProvider>
          <ScrollToTop />
          <Routes>
            {/* Storefront */}
            <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
            <Route path="/shop" element={<StorefrontLayout><Shop /></StorefrontLayout>} />
            <Route path="/product/:slug" element={<StorefrontLayout><ProductDetail /></StorefrontLayout>} />
            <Route path="/about" element={<StorefrontLayout><About /></StorefrontLayout>} />
            <Route path="/contact" element={<StorefrontLayout><Contact /></StorefrontLayout>} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductForm />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="feedback" element={<AdminFeedback />} />
              </Route>
            </Route>

            <Route path="*" element={<StorefrontLayout><NotFound /></StorefrontLayout>} />
          </Routes>
        </ToastProvider>
      </SiteSettingsProvider>
    </HashRouter>
  );
}
