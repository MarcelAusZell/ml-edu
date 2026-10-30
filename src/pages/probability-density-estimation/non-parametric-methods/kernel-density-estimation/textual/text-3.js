import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      Let's analyze this in more detail:
      <br />
      For each observed data point {latexFormula("x_i")} we build a kernel {latexFormula("k(u)")} which assigns a weight
      to each non-observed data point {latexFormula("x")} depending on how far away it is from the observed point{" "}
      {latexFormula("x_i")}
      <div className="centered-text-container">{latexFormula("k(x - x_i)")}</div>
      This weight is highest for {latexFormula("x = x_i")} and {latexFormula("\\dots")}
    </>
  );
}
