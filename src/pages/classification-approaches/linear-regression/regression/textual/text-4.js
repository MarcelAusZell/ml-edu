import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      Again, the goal is to minimize the error between the predicted value{" "}
      {latexFormula("y(\\vec{x}_n; \\vec{w})")} and the actual value {latexFormula("t_n")} (but now{" "}
      {latexFormula("t_n \\in {\\mathbb{R}}")}). We can use the same squared error function
      <div className="centered-text-container">
        {latexFormula("\\displaystyle E(\\vec{w}) = \\frac{1}{2} \\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2")}
      </div>
      as we did in the classification case.
    </>
  );
}
