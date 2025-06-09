// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import HomePage from "pages/home";
import CompanyOverview from "pages/company-overview";
import CostEstimationForm from "pages/cost-estimation-form";
import EmbeddableCalculatorWidget from "pages/embeddable-calculator-widget";
import WixReadyIframeCalculatorWidget from "pages/wix-ready-iframe-calculator-widget";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company-overview" element={<CompanyOverview />} />
          <Route path="/cost-estimation-form" element={<CostEstimationForm />} />
          <Route path="/embeddable-calculator-widget" element={<EmbeddableCalculatorWidget />} />
          <Route path="/wix-ready-iframe-calculator-widget" element={<WixReadyIframeCalculatorWidget />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;