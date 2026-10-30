import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      However, for other values of {latexFormula("x")}, we have a saturation behavior. For{" "}
      {latexFormula("x \\rightarrow -\\infty")} the sigmoid function approaches {latexFormula("0")}{" "}
      {latexFormula("\\dots")}
    </>
  );
}
