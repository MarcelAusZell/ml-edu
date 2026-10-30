import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      {latexFormula("\\dots")} are summed up and averaged to ultimaltely give the probability density estimate at{" "}
      {latexFormula("x")}.
      <div className="centered-text-container">
        <span className="txt-2">{latexFormula(" \\frac{1}{N} \\displaystyle\\sum_{i=1}^{N} k(x - x_i)")}</span>
      </div>
    </>
  );
}
