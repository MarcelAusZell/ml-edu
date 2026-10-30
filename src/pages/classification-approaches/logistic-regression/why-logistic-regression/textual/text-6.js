import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      {latexFormula("\\dots")} moreover it penalized "too" correct data points, because the output of the prediction{" "}
      {latexFormula("y(\\vec{w}; \\vec{x}_n)")} could grow arbitrarily large
      <br />
      <span className="note-text">
        Remember:
        <br />
        {latexFormula("y(\\vec{w}; \\vec{x}_n)")} captured the distance of the data point to the decision boundary.
      </span>
    </>
  );
}
