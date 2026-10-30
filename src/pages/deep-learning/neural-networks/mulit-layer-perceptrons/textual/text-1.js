import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text1() {
  return (
    <>
      So far, the linear regression and classification models discussed in the previous sections rely on linear
      combinations of fixed nonlinear basis functions {latexFormula("\\phi_j(\\vec{x})")} and are expressed as:
      <div className="centered-text-container">
        {latexFormula(
          "y(\\vec{x}; \\vec{w}) = f\\left(\\vec{w}^\\top \\vec{\\phi}(\\vec{x})\\right) = f\\left(\\displaystyle \\sum_{j=1}^{M} \\textcolor{teal}{w_j} \\textcolor{sandybrown}{\\phi_j(\\vec{x})}\\right)"
        )}
      </div>
      where {latexFormula("f(\\cdot)")} is a nonlinear activation function for classification and the identity function
      for regression. The goal now is to move away from using fixed basis functions{" "}
      {latexFormula("\\textcolor{sandybrown}{\\phi_j(\\vec{x})}")} and enhance the model by making the basis functions
      parameter-dependent, allowing these parameters to be adjusted along with the coefficients{" "}
      {latexFormula("\\textcolor{teal}{\\vec{w}_j}")} during training.
      <TextPlaceholder height={10} />
      We can do that by redefining the basis functions {latexFormula("\\phi_j")} by generalized linear models: Each
      basis function is now a function of the input vector {latexFormula("\\vec{x}")}, and its own set of parameters{" "}
      {latexFormula("\\vec{w}_j^{(1)}")}
      <div className="centered-text-container">
        {latexFormula(
          "\\phi_j(\\vec{x}; \\vec{w}_j^{(1)}) = h(\\vec{w}_j^{(1)\\top} \\vec{x}) = h\\left(\\displaystyle \\sum_{i=0}^{D} w_{ji}^{(1)} x_i\\right)"
        )}
      </div>
      <TextPlaceholder height={10} />
      our neural network can now be described as follows:
      <TextPlaceholder height={10} />
      The input features{" "}
      <div className="txt-1" style={{ textAlign: "center" }}>
        {latexFormula("x_0, \\dots, x_D")}
      </div>
      {latexFormula("\\dots")}
    </>
  );
}
