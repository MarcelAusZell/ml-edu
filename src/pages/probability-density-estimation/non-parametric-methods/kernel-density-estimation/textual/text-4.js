import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      {latexFormula("\\dots")} decreases as we move further away from {latexFormula("x_i")}. 
      While {latexFormula("x")}-values near {latexFormula("x_i")} are assigned a high weight, {latexFormula("\\dots")}
    </>
  );
}
