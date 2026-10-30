import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      We now want to use the model of linear discriminants to classify data points. As we are in the context of a
      supervised learning problem, we have a dataset of data points {latexFormula("\\vec{x}_1, \\dots, \\vec{x}_N")}{" "}
      with their corresponding labels {latexFormula("t_1, \\dots, t_N")}. Intuitively, we want the output of our
      prediction {latexFormula("y(\\vec{x}_n ;\\vec{w})")} to be as close as possible to the true label{" "}
      {latexFormula("t_n")} for all data points {latexFormula("\\vec{x}_n")} which can be expressed as:
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\underset{\\textcolor{Salmon}{\\vec{w}}}{\\text{arg\\,min}} \\; \\textcolor{teal}{E(\\vec{w})} = \\underset{\\textcolor{Salmon}{\\vec{w}}}{\\text{arg\\,min}} \\textcolor{gray}{\\frac{1}{2}}\\textcolor{olive}{\\sum_{n=1}^{N}} (\\textcolor{red}{y(\\vec{x}_n ;\\vec{w})} - \\textcolor{Turquoise}{t_n})^{\\textcolor{gray}{2}}"
        )}
      </div>
      This means we want the <span style={{ color: "teal" }}>overall error</span> -{" "}
      <span style={{ color: "olive" }}>the sum</span> of the differences between the{" "}
      <span style={{ color: "red" }}>predicted</span> and the <span style={{ color: "Turquoise" }}>true label</span> to
      be minimized by finding the optimal weight vector {latexFormula("\\textcolor{Salmon}{\\vec{w}}")}
      <br />
      <span className="note-text">
        The factor of {latexFormula("\\frac{1}{2}")} and the exponent of {latexFormula("2")} are just for mathematical convenience for the next step of building the
        derivative.
      </span>
    </>
  );
}
