import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return <>A too large {latexFormula("k")} will lead to a biased estimate, {latexFormula("...")}</>;
}
