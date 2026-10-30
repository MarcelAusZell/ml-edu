import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      In the near vicinity of {latexFormula("x = 0")} we have a linear behaviour that means increases or decreases in {latexFormula("x")} are directly passed
      through the activation function and the actiavtion function has basically no effect.
    </>
  );
}
