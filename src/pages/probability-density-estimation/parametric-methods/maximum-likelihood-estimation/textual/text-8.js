import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text8() {
  return (
    <>
      However, this result is biased. Evaluating the expectations of the Maximum Likelihood Estimates for the mean and
      variance given an true gaussian distribution with mean {latexFormula("\\mu")} and variance{" "}
      {latexFormula("\\sigma^2")} results in:
      <ul>
        <li>{latexFormula("\\mathbb{E}[\\hat{\\mu}] = \\mu")}</li>
        <TextPlaceholder height={1} />
        <li>{latexFormula("\\mathbb{E}[\\hat{\\sigma}^2] = \\frac{N-1}{N} \\sigma^2")}</li>
      </ul>
      While the expectation of the mean estimate is unbiased, the expectation of the variance estimate systematically
      underestimates the true variance by a factor of {latexFormula("\\frac{N-1}{N}")}. We therefore have to correct
      the Maximum Likelihood Estimate for the variance by multiplying it with {latexFormula("\\frac{N}{N-1}")}
    </>
  );
}
