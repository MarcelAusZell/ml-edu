import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      The last non-parametric method we will discuss is the {latexFormula("k")}-Nearest Neighbour Density Estimation.
      Instead of using kernel functions, the {latexFormula("k")}-nearest-neighbour method estimates the density by
      considering the locality of the data points.
    </>
  );
}
