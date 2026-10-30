import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      Intuitively the following happens to obtain the probability density estimate for a point {latexFormula("x")}:
      <br />
      The weights of the other kernels of the other data points {latexFormula("x_i")} corresponding to{" "}
      {latexFormula("x")}
      {latexFormula("\\dots")}
    </>
  );
}
