import Latex from "react-latex-next";

// This function is used to render LaTeX formulas in the text-sections of the scrollytelling
export default function latexFormula(text, color = "") {
  if (color) {
    return <Latex>{`$\\textcolor{${color}}{${text}}$`}</Latex>;
  } else {
    return <Latex>{`$${text}$`}</Latex>;
  }
}