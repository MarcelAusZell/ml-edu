import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      It consists of an input layer which denotes the inputs{" "}
      {latexFormula("\\vec{x} = (x_0 = 1, x_1 \\ldots, x_D)^\\top")}
      which are weighted by the weights {latexFormula("\\vec{w} =(w_0, w_1, \\ldots, w_D)^\\top")}
      which then produces an output {latexFormula("y(\\vec{x})")}:
      <div className="centered-text-container">{latexFormula("y(\\vec{x}) = \\vec{w}^\\top \\vec{x}")}</div>
      <div style={{ textAlign: "center", opacity: "0.2", marginBottom: "1.5rem" }}>
        {latexFormula("y(\\vec{x}) = g(\\vec{w}^\\top \\vec{x})")}
      </div>
      An equation that is very familiar to us, as it is the equation of a generalized linear discriminant. E.g.such
      1-layer neural network could be understood as a case of linear regression where we want to predict the continuous
      output {latexFormula("y")} from the input {latexFormula("\\vec{x}")} by a parmetrization{" "}
      {latexFormula("\\vec{w}")} by a linear mapping {latexFormula("\\vec{w}^\\top \\vec{x}")} where we use the identity
      function {latexFormula("g(x) = x")} as the activation function
      <br />
      <span className="note-text">
        {latexFormula("g")} denotes the activation function as discussed in the section about generalized linear
        discriminants. A typically non-linear function such as the sigmoid function{" "}
        {latexFormula("\\sigma(x) = \\frac{1}{1 + e^{-x}}")} or the hyperbolic tangent function{" "}
        {latexFormula("\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}")}
      </span>
    </>
  );
}
