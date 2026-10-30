import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text5() {
  return (
    <>
      Up to now, we have only considered the one-dimensional case. However, in practice, we often have to deal with
      multivariate data. In such cases, we need to extend the univariate normal distribution to the multivariate normal
      distribution.
      <br />
      <span className="note-text">
        For instance, let's say we're trying to differentiate between cats and dogs. Instead of just considering their
        height, we now have a wealth of features to work with: weight, tail length, fur color etc.
      </span>
      <hr />
      Again, let's try to understand the structure of the multivariate normal distribution first.
      <div className="centered-text-container">
        {latexFormula(
          "p(\\vec{x} \\mid \\vec{\\mu}, \\Sigma) = \\frac{1}{(2\\pi)^{D/2} \\text{det}(\\Sigma)^{1/2}} e^{-\\frac{1}{2} (\\vec{x} - \\vec{\\mu})^T \\Sigma^{-1} (\\vec{x} - \\vec{\\mu})}"
        )}
      </div>
      Instead of scalar values, we now have:
      <ul>
        <li>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {latexFormula("\\vec{x} = (x_1, x_2, \\ldots, x_D)")}
            <span style={{ opacity: 0.3 }}>vector of {latexFormula("D")} features</span>
          </div>
        </li>
        <li>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {latexFormula("\\vec{\\mu} = (\\mu_1, \\mu_2, \\ldots, \\mu_D)")}
            <span style={{ opacity: 0.3 }}>vector of {latexFormula("D")} means</span>
          </div>
        </li>
        <li>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {latexFormula("\\Sigma")}
            <span style={{ opacity: 0.3 }}>{latexFormula("D \\times D")} covariance matrix (s.p.d. matrix)</span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          {latexFormula("\\frac{1}{(2\\pi)^{D/2} \\text{det}(\\Sigma)^{1/2}}")}
          <TextPlaceholder height={10} />
          <ul>
            <li>
              Similar to the univariate case, this is the normalization constant for the {latexFormula("D")}-dimensional
              space. It ensures that the integral of the function across all possible values of {latexFormula("x")}{" "}
              integrates to {latexFormula("1")}.
            </li>
          </ul>
        </li>

        <li>
          <TextPlaceholder height={10} />
          {latexFormula("e^{-\\frac{1}{2} (\\vec{x} - \\vec{\\mu})^T \\Sigma^{-1} (\\vec{x} - \\vec{\\mu})}")}
          <ul>
            <li>
              This exponential term again calculates the probability density for a specific data point{" "}
              {latexFormula("x")} in the {latexFormula("D")}-dimensional space.
            </li>
            <li>
              {latexFormula("-\\frac{1}{2}(\\vec{x} - \\vec{\\mu})^T \\Sigma^{-1} (\\vec{x} - \\vec{\\mu})")}
              <TextPlaceholder height={10} />
              Similarly to the univariate case, we again have a squared difference term, representing the deviation of
              the data point from the mean. However, this time it is written in vector notation. The covariance matrix
              normalizes the deviation in each dimension and ensures that the deviations are scaled correctly.
            </li>
          </ul>
        </li>
      </ul>
      Visualizing the multivariate normal distribution often entails representing isocontours in {latexFormula("D")}
      -dimensional space. In two dimensions, these isocontours form ellipses centered around the mean vector{" "}
      {latexFormula("\\vec{\\mu}")}, showing us the probability density for different values of{" "}
      {latexFormula("\\vec{x}")}.
      <br />
      <span className="note-text">
        <ul>
          <li>
            {" "}
            In this example, the most outer isocontour represents the area where different values of {latexFormula(
              "x"
            )}{" "}
            have a probability of {latexFormula("0.1")}. The inner isocontours represent areas with higher probabilities
          </li>
          <li>s.p.d means symmetric positive definite</li>
          <li>The plot can be thought of as the top view of the 3D plot</li>
        </ul>
      </span>
    </>
  );
}
