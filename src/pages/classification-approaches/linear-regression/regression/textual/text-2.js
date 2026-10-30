import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      In practical applications, data rarely conforms precisely to such idealized functions. Instead, measurements are
      often corrupted by various sources of noise and uncertainties. Consequently, the observed values of{" "}
      {latexFormula("t")} deviate from the true underlying relationship with {latexFormula("x")}
      <br />
      (which can introduce challenges in accurately modeling and predicting {latexFormula("t")} based on{" "}
      {latexFormula("x")})
      <br />
      <span className="note-text">
        Noise can stem from measurement errors, inherent variability in the phenomenon being studied, or other
        unpredictable factors in data collection.
      </span>
    </>
  );
}
