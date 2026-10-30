import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      For a binary classification problem where we are given inputs
      <div className="centered-text-container">
        {latexFormula("X = \\{\\vec{x}_1, \\vec{x}_2, \\ldots, \\vec{x}_N\\}, \\quad \\vec{x}_n \\in \\mathbb{R}^D")}
      </div>{" "}
      and corresponding target values
      <div className="centered-text-container">
        {latexFormula("T = \\{t_1, t_2, \\ldots, t_n\\}, \\quad \\vec{t}_n \\in \\{0, 1\\}")}
      </div>{" "}
      where {latexFormula("t = 0")}
      denotes class {latexFormula("C_1")} and {latexFormula("t = 1")} denotes class {latexFormula("C_2")}, we again
      would only need only one output unit. We can use the sigmoid activation function for the output layer:
      <div className="centered-text-container">{latexFormula("y(\\vec{x}, \\vec{w}) = h^{(2)}(a) = \\sigma(a)")}</div>
      such that {latexFormula("y(\\vec{x}, \\vec{w}) \\in [0, 1]")}. As we now can interpret{" "}
      {latexFormula("y(\\vec{x}, \\vec{w})")} as the probability
      {latexFormula("p(\\mathcal{C}_1|\\vec{x})")} that input {latexFormula("\\vec{x}")} belongs to class{" "}
      {latexFormula("C_1")} (and {latexFormula("1 - p(\\mathcal{C}_1|\\vec{x})")} that it belongs to class{" "}
      {latexFormula("C_2")}), we can use the cross-entropy loss function:
      <div className="centered-text-container">
        {latexFormula(
          "L(t_n, y(\\vec{x}_n, \\vec{w})) = -(t_n \\ln(y(\\vec{x}_n, \\vec{w})) + (1 - t_n) \\ln(1 - y(\\vec{x}_n, \\vec{w})))"
        )}
      </div>
    </>
  );
}
