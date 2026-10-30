import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      We again see the connection to generalized linear discriminants as the output of this mutli-class network is given
      by
      <div className="centered-text-container">
        {latexFormula("y_k(\\vec{x}) = \\vec{w}_k^{T}\\vec{x} = \\displaystyle \\sum_{i=0}^{D} w_{ki} \\vec{x}_i")}
      </div>
      <div style={{ textAlign: "center", opacity: "0.2", marginBottom: "1.5rem" }}>
        {latexFormula(
          "y_k(\\vec{x}) = g(\\vec{w}_k^{T}\\vec{x}) = g(\\displaystyle \\sum_{i=0}^{D} w_{ki} \\vec{x}_i)"
        )}
      </div>
      A familiar context as this model construction is as in linear classification case with {latexFormula("K")}{" "}
      classes.
    </>
  );
}
