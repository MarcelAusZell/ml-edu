import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      {latexFormula("...")} the main focus lies on estimating the class probability densities / likelihoods{" "}
      {latexFormula("p(x \\mid \\mathcal{C}_k)")} for each class {latexFormula("\\mathcal{C}_k")} separately. The prior
      probability {latexFormula("p(\\mathcal{C}_k)")} can be estimated from the data as the proportion of data points in
      class {latexFormula("\\mathcal{C}_k")}.
      <br />
      In literature, it is common to drop the class label {latexFormula("\\mathcal{C}_k")}. Thus further down, we simply
      write {latexFormula("p(x)")} for the probability density of the data.
    </>
  );
}
