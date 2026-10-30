import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      For {latexFormula("x = 30")} the likelihood <span className="txt-2">{latexFormula("p(x \\mid b)")}</span> is much higher than{" "}
      <span className="txt-1">{latexFormula("p(x \\mid a)")}</span>
      <br />
      Again, the decision is clear: We would classify {latexFormula("x = 30")} as {latexFormula("b")}.
    </>
  );
}
