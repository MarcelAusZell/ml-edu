import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      For a point {latexFormula("x")} for which the density is to be estimated, {latexFormula("\\dots")}
    </>
  );
}
