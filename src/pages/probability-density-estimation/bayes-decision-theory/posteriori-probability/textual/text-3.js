import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      But how would you handle {latexFormula("x = 20")}?
      <br />
      Since both classes have a similar likelihood for {latexFormula("x = 20")}, the decision is not clear.
    </>
  );
}
