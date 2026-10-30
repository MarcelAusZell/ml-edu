import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      We saw that once we obtained the likelihood {latexFormula("p(x \\mid \\mathcal{C}_k)")} and the prior probability{" "}
      {latexFormula("p(\\mathcal{C}_k)")}, we can use Bayes' Theorem to make decisions{" "}
      {latexFormula("y_k(x) \\propto p(x \\mid \\mathcal{C}_k) p(\\mathcal{C}_k)")}.
    </>
  );
}
