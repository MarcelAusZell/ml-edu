import latexFormula from "../../../../../utils/latex-formula";

export default function Text10() {
  return (
    <>
      While this section mainly shows the methods for the one-dimensional case, they can also be applied to higher
      dimensions. For example for KNN-Density-Estimation with {latexFormula("D=2")}, we find the {latexFormula("k")}{" "}
      nearest neighbours of {latexFormula("x")} by {latexFormula("...")}
    </>
  );
}
