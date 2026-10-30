import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      In the previous section, we saw that once we obtain the prior {latexFormula("p(x)")} and likelihood{" "}
      {latexFormula("p(x \\mid \\mathcal{C}_k)")} probability for each class, we can calculate the posterior probability{" "}
      {latexFormula("p(\\mathcal{C_k} \\mid x)")} for each class, which then allows us to classify new data points
      according to the class with the highest posterior probability.
    </>
  );
}
