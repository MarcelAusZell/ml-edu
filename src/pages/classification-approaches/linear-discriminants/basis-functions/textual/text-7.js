import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      In this example, we can solve the onedimensional XOR problem by using a third-degree polynomial basis function{" "}
      <div className="centered-text-container">{latexFormula("\\phi{(x)} = (x^3, x^2, x, 1)^\\top")}</div>
    </>
  );
}
