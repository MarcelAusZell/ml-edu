import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      Furthermore, while the histogram can be applied for any dimension D, the so-called{" "}
      <span className="emphasized-text">curse of dimensionality</span> becomes a
      significant issue as the dimensionality increases. The curse of dimensionality refers to the exponential growth of
      the volume of the space as the dimensionality increases. If we divide each variable into {latexFormula("M")} bins,
      we will have a total of {latexFormula("M^D")} bins in the D-dimensional space. In addition, we get Discontinuities
      at bin edges. Nonetheless, for low-dimensional data, histograms are a simple and effective way to estimate the
      probability density but rather for visualization purposes than for actual practical density estimation.
    </>
  );
}
