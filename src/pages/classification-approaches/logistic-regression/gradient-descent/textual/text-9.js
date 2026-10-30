import latexFormula from "../../../../../utils/latex-formula";

export default function Text9() {
  return (
    <>
      There is not only the danger of choosing the learning rate too small, which leads to slow convergence, but also
      choosing the learning rate so large that for each step, it overshoots the minimum, {latexFormula("\\dots")}
    </>
  );
}
