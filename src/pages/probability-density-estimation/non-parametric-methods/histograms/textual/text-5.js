import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      Consequently, if we choose {latexFormula("\\Delta_i")} too small, the histogram will be too noisy and again does
      not capture the structure of the underlying distribution well. It is{" "}
      <span className="emphasized-text">undersmoothed</span>
    </>
  );
}
