import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      In this case, we would need to consider the prior probabilities {latexFormula("p(\\mathcal{C}_k)")}. Because the
      prior probability for {latexFormula("a")} is higher than for {latexFormula("b")}, we would classify{" "}
      {latexFormula("x = 20")} as {latexFormula("a")}.
    </>
  );
}
