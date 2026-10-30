import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return (
    <>
      We observe that the decision boundary are still at{" "}
      <div className="centered-text-container">{latexFormula("y(x) = 0")}</div>
    </>
  );
}
