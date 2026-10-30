import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      Though we now understand the structure and the update rule of logistic regression, we have not yet discussed why
      logistic regression should be used. If we compare the method of logistic regression to the method of building a
      pure probabilistic classifier through Bayes' theorem, we see that modeling the posterior probability directly is
      much more parameter efficient.
      <br />
      For an {latexFormula("M")}-dimensional input space, the number of parameters for a pure probabilistic classifier
      for a two-class-problem would be governed by:
      <br />
      <ul>
        <li>
          first estimating the class-conditional densities{" "}
          {latexFormula("p(\\vec{x} | \\mathcal{C_1}) , p(\\vec{x} | \\mathcal{C_2}")} which requires 2 means{" "}
          {latexFormula("\\vec{\\mu_1}, \\vec{\\mu_2}")} and 2 covariance matrices{" "}
          {latexFormula("\\Sigma_1, \\Sigma_2")} for each class. We therefore have:
          <ul>
            <li>{latexFormula("2M")} parameters for the means and</li>
            <li>{latexFormula("2 \\cdot \\frac{M(M+1)}{2} = M(M+1)")} parameters for the covariances</li>
          </ul>
        </li>
        {latexFormula("\\dots")}
      </ul>
      <span className="note-text">
        The covariance matrices are symmetric (and positive definite), so we only need to estimate the upper triangular
        part of the matrix, hence only {latexFormula("\\frac{M(M+1)}{2}")} instead of {latexFormula("M^2")} parameters
        for each covariance.
      </span>
    </>
  );
}
