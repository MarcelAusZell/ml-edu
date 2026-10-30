import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text5() {
  return (
    <>
      Combined with a normalization factor, the posterior probability {latexFormula("p(\\mathcal{C}_k \\mid x)")} is the
      probability we are really interested in:
      <br />
      <span className="emphasized-text">
        The probability of a class {latexFormula("\\mathcal{C}_k")} given the feature vector {latexFormula("x")}.
      </span>
      <br />
      This means that given a handwritten letter {latexFormula("x")} we want to know the probability that it is a
      certain letter / belongs to a certain class. This is the essence of Bayes Decision Theory and results in the
      well-known Bayes Theorem:
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle p(\\mathcal{C}_k \\mid x) = \
        \\frac{p(x \\mid \\mathcal{C}_k) \\cdot p(\\mathcal{C}_k)}{p(x)} = \
        \\frac{p(x \\mid \\mathcal{C}_k) \\cdot p(\\mathcal{C}_k)}{\\sum_{j} p(x \\mid \\mathcal{C}_j) \\cdot p(\\mathcal{C}_j)}"
        )}
      </div>
      which can be thought of as
      <div className="centered-text-container">
        {latexFormula(
          "\\text{Posterior} = \\frac{\\text{Likelihood} \\cdot \\text{Prior}}{\\text{Normalization Factor}}"
        )}
      </div>
    </>
  );
}
