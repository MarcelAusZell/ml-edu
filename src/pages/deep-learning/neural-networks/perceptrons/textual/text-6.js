import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      The model can moreover be extended by the concept of basis functions, which transform the input data into a
      (usually) higher-dimensional space which then allows for non-linear decisions. The resulting model is again the
      same as seen in the generalized linear discriminant case:
      <div className="centered-text-container">
        {latexFormula(
          "y_k(\\vec{x}) = \\vec{w}^T\\vec{\\phi}(\\vec{x}) = \\displaystyle \\sum_{i=0}^{D} w_i \\phi_i(\\vec{x})"
        )}
      </div>
      <div style={{ textAlign: "center", opacity: "0.2" }}>
        {latexFormula(
          "y_k(\\vec{x}) = g(\\vec{w}^T\\vec{\\phi}(\\vec{x})) = g(\\displaystyle \\sum_{i=0}^{D} w_i \\phi_i(\\vec{x}))"
        )}
      </div>
    </>
  );
}
