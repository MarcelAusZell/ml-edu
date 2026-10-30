import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      This probability is expressed as the likelihood function:
      <div className="centered-text-container">
        {latexFormula("\\displaystyle L(\\theta \\mid x) = p(\\mathcal{X} \\mid \\theta) = \\prod_{i=1}^{N} p(x_i \\mid \\theta)")}
      </div>
      For the univariate normal distribution, the likelihood function expresses how likely it is to observe the data{" "}
      {latexFormula("\\mathcal{X}")} given different values of mean and variance/standard deviation{" "}
      {latexFormula("\\theta = (\\mu, \\sigma)")}.
    </>
  );
}
