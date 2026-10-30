import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { useTheme } from "../../utils/theme-provider";
import Logo from "../../assets/ml-edu-logo";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  // Add fixed-top for fixed navbar -> will need to adjust padding
  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? "navbar-dark" : "navbar-light"}`}>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <Logo className="navbar-brand" />
        </NavLink>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar top-bar"></span>
          <span className="icon-bar middle-bar"></span>
          <span className="icon-bar bottom-bar"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink
                to="/probability-density-estimation"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>Probability Density Estimation</strong>
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/probability-density-estimation/bayes-decision-theory"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Bayes Decision Theory
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/probability-density-estimation/parametric-methods"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Parametric Methods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/probability-density-estimation/non-parametric-methods"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Nonparametric Methods
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                to="/classification-and-regression"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>Classification and Regression</strong>
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/classification-and-regression/linear-discriminants"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Linear Discriminants
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/classification-and-regression/linear-regression"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Linear Regression
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/classification-and-regression/logistic-regression"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Logistic Regression
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                to="/deep-learning"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>Deep Learning</strong>
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/deep-learning/neural-networks"
                    className={({ isActive }) => (isActive ? "dropdown-item-active" : "dropdown-item")}
                  >
                    Neural Networks
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                <i className="bi bi-info-lg"></i>{" "}
              </NavLink>
            </li>
          </ul>
          <div className="darkmode-toggler-container">
            <button className="btn darkmode-toggler" onClick={toggleTheme}>
              {isDarkMode ? (
                <i className="bi moon bi-moon-fill"></i>
              ) : (
                <i className="bi sun bi-brightness-high-fill"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
