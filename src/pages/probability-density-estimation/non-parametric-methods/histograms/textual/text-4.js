import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      If we choose {latexFormula("\\Delta_i")} too big, the histogram will be too coarse and we will lose important
      information about the underlying distribution. It barely captures the bimodality of the data. It is{" "}
      <span className="emphasized-text">oversmoothed</span>
    </>
  );
}
