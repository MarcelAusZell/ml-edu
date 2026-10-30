import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      {latexFormula("\\dots")} {latexFormula("x")}-values far away from {latexFormula("x_i")} are assigned a low weight to reflect the decreasing confidence in the
      probability density as we move away from the observed data point.
    </>
  );
}
