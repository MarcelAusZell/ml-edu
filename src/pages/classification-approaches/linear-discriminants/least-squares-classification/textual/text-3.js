import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      While simple and straightforward in its implementation, the least squares classification approach has some
      drawbacks. One of the main issues is that it is <span className="emphasized-text">sensitive to outliers</span>. Data points {latexFormula("\\vec{x}_n")}{" "}
      far away from the decision boundary evaluate to high {latexFormula("y(\\vec{x}_n)")} values, which then contribute
      significantly to the overall error and ultimately to the decision boundary.
      <br />
      <span className="note-text">
        These outliers can be "too correct" data points as well as "too incorrect" ones as long{" "}
        {latexFormula("y(\\vec{x}_n)")}, the distance to the decision boundary, is too large.
      </span>
    </>
  );
}
