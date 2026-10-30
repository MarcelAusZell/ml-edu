import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      In the context of Bayes Decision Theory, probabilistic classifiers are built by estimating the posterior
      probabilities of the classes. The posterior probabilities {latexFormula("p(\\mathcal{C}_k \\mid x)")} are derived
      using the class-conditional densities (the likelihoods) {latexFormula("p(x \\mid \\mathcal{C}_k)")} and the prior
      probabilities {latexFormula("p(\\mathcal{C}_k)")}. This relationship is governed by Bayes' theorem:
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle p(\\mathcal{C}_k \\mid \\vec{x}) = \\frac{p(\\vec{x} \\mid \\mathcal{C}_k) p(\\mathcal{C}_k)}{p(\\vec{x})}"
        )}
      </div>
      In Logistic Regression, we model the posterior probabilities directly by using the framework of linear
      discriminants. This approach is more direct as it bypasses the need to first estimate the class-conditional
      densities and directly applies a linear model to the features.
    </>
  );
}
