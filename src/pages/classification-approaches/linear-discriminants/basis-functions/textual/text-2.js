import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      For such cases where the data is not linearly separable, we can use non-linear{" "}
      <span className="emphasized-text">basis functions</span> {latexFormula("\\phi_j{(\\vec{x})}")} to transform the
      input features into a new dimension where the data is easily linearly separable:
      <div className="centered-text-container">
        {latexFormula("y(\\vec{x}) = \\displaystyle \\sum_{j=1}^M w_j \\phi_j(\\vec{x}) + w_0")}
      </div>
      with {latexFormula("\\phi: \\mathbb{R}^D \\rightarrow \\mathbb{R}^M")} being the basis functions.
    </>
  );
}
