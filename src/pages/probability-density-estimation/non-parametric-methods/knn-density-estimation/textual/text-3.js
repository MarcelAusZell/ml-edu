import latexFormula from "../../../../../utils/latex-formula";


export default function Text2() {
  return (
    <>
      {latexFormula("\\dots")} we find the {latexFormula("k")} nearest neighbours of {latexFormula("x")}, by expanding a {latexFormula("D")}-dimensional
      hypersphere centered at {latexFormula("x")}, and counting the number of data points within this hypersphere until{" "}
      {latexFormula("k")} points are found. For the one-dimensional case, this hypersphere is a line segment.
    </>
  );
}
