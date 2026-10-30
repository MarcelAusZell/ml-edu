import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text5() {
  return (
    <>
      These activations are then transformed by a appropriate activation function to finally describe the set of output
      values {latexFormula("y_k")}
      <div className="centered-text-container">
        <span className="txt-3">
          {latexFormula("y_k = h^{(2)}(a_k) = h^{(2)}(\\displaystyle \\sum_{j=0}^{M} w_{kj}^{(2)} z_j)")}
        </span>
      </div>
      we can thus describe the entirty of the neural network as
      <div className="centered-text-container">
        {latexFormula(
          "y_k(\\vec{x}) = h^{(2)}(\\displaystyle \\sum_{j=0}^{M} w_{kj}^{(2)} h^{(1)}(\\displaystyle \\sum_{i=0}^{D} w_{ji}^{(1)} x_i))"
        )}
      </div>
      <br />
      <span className="note-text">
        {latexFormula("\\vec{y} = [y_1, \\dots, y_K]^\\top= h^{(2)}(W^{(2)}h^{(1)}(W^{(1)}\\vec{x}))")}
      </span>
    </>
  );
}
