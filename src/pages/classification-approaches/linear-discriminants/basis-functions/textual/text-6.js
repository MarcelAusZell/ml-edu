import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      If we have insight into the problem for which a decision boundary is to be learned, we can use this knowledge to
      transform the input space in a way that makes the problem easier to solve (like in the example shown previously).
      But for more general approaches often predefined basis functions are used. One of which are polynomial basis
      functions, where the input features are transformed into a higher dimensional space by mapping{" "}
      {latexFormula("\\vec{x}")} to powers of {latexFormula("x")}:
      <div className="centered-text-container">{latexFormula("\\phi{(x)} = (x^m, x^{m-1}, \\dots , x,1)^\\top")}</div>
    </>
  );
}
