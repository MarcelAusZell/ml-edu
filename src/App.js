import { Routes, Route } from "react-router-dom";
import "./App.scss";
import About from "./pages/about/about";
import BayesDecisionTheory from "./pages/probability-density-estimation/bayes-decision-theory/bayes-decision-theory";
import Home from "./pages/home/home";
import LinearDiscrimants from "./pages/classification-approaches/linear-discriminants/linear-discriminants";
import LinearRegression from "./pages/classification-approaches/linear-regression/linear-regressions";
import LogisticRegression from "./pages/classification-approaches/logistic-regression/logistic-regression";
import Navbar from "./components/navbar/navbar";
import NeuralNetworks from "./pages/deep-learning/neural-networks/neural-networks";
import NonParametricMethods from "./pages/probability-density-estimation/non-parametric-methods/non-parametric-methods";
import ParametricMethodsPage from "./pages/probability-density-estimation/parametric-methods/parametric-methods";
import PageNotFound from "./pages/page-not-found/page-not-found";
import ThemeProvider from "./utils/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/probability-density-estimation">
          <Route path="bayes-decision-theory" element={<BayesDecisionTheory />} />
          <Route path="parametric-methods" element={<ParametricMethodsPage />} />
          <Route path="non-parametric-methods" element={<NonParametricMethods />} />
        </Route>

        <Route path="/classification-and-regression">
          <Route path="linear-discriminants" element={<LinearDiscrimants />} />
          <Route path="linear-regression" element={<LinearRegression />} />
          <Route path="logistic-regression" element={<LogisticRegression />} />
        </Route>

        <Route path="/deep-learning">
          <Route path="neural-networks" element={<NeuralNetworks />} />
        </Route>

        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}
