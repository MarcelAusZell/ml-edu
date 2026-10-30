import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      It again captures the probability density for all different possible values of {latexFormula("x")} that we did not
      explicitly observe.
      <div className="centered-text-container">
        <span className="txt-2">{latexFormula("\\hat{p}_{knn}(x \\, ; k) = \\frac{k}{N} \\cdot \\frac{1}{V_k(x)}")}</span>
      </div>
      Just like in the previous two nonparametric-methods, we have a smoothing parameter {latexFormula("k")} that
      determines the number of neighbors. Again we have to be careful with the choice of {latexFormula("k")}:
    </>
  );
}
