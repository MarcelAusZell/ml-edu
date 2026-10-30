import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      Remember that {latexFormula("x")} is a feature vector that measures some properties of the letter (e.g., the count of filled pixels).
      <br />
      For {latexFormula("x = 10")} the likelihood <span className="txt-1">{latexFormula("p(x \\mid a)")}</span> is much higher than{" "}
      <span className="txt-2">{latexFormula("p(x \\mid b)")}</span>, the decision is clear: We would classify {latexFormula("x = 10")} as {latexFormula("a")}.
    </>
  );
}
