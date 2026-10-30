import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text2() {
  return (
    <>
      We can counter this issue by applying a (nonlinear) <span className="emphasized-text">activation function</span> {latexFormula("g(\\cdot)")} so that
      <br />
      {latexFormula("y(\\vec{x}) = g(\\vec{w}^T\\vec{x} + w_0)")} is limited in its growth.
      <div className="note-text">
        Even though we apply a nonlinear function to the output, the decision boundary remains linear. Our decision
        boundary is defined as the set of points {latexFormula("\\vec{x}")} for which
        <br />
        <div style={{ textAlign: "center" }}>{latexFormula("y(\\vec{x}) = const")}</div>It follows that
        <br />
        <div style={{ textAlign: "center" }}>{latexFormula("\\vec{w}^T\\vec{x} + w_0 = const")}</div>
        which concludes that
        <div style={{ textAlign: "center" }}>{latexFormula("g(\\vec{w}^T\\vec{x} + w_0) = g(const) = const")}</div>
        therefore the nonlinear activation function {latexFormula("g(\\cdot)")} does not affect the linearity of the
        decision boundary.
      </div>
    </>
  );
}
