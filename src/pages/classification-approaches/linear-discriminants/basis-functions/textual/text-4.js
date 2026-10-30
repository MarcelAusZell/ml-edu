import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      {latexFormula("\\dots")} it is now easily separable in the one-dimensional feature space. The transformation essentially computes the squared
      distance from the origin for each point, which results the points of class {latexFormula("\\mathcal{C}_1")} will
      have lower values, and the points of class {latexFormula("\\mathcal{C}_2")} will have higher values.
    </>
  );
}
