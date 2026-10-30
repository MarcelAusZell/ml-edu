import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      These activations are then transformed by a non-linear differentiable activation function{" "}
      {latexFormula("h(\\cdot)")} to produce the output of the so-called hidden layer
      <div className="centered-text-container">
        <span className="txt-3">
          {latexFormula("z_j = h(a_j) = h(\\displaystyle \\sum_{i=0}^{D} w_{ji}^{(1)} x_i)")}
        </span>
      </div>
      which correspond to the replacements of the fixed basis functions used in the previous models. The non-linear
      activation function {latexFormula("h(\\cdot)")} are typically sigmoidal functions such as the logistic sigmoid
      function or the hyperbolic tangent function.
      <br />
      <span className="note-text">{latexFormula("\\vec{z} = [z_1, \\dots, z_M]^\\top= h^{(1)}(W^{(1)}\\vec{x})")}</span>
    </>
  );
}
