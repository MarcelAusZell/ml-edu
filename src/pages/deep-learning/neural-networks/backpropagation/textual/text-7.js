import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text7() {
  return (
    <>
      This is an important result as it effectively describes that the node-errors {latexFormula("\\delta_k")} can be
      propagated to the lower layers via the update rule {latexFormula("\\delta_j = h'(a_j) \\sum_k \\delta_k w_{jk}")}.
      This is the core of the backpropagation algorithm. Instead of computing the derivatives from the first layer to
      the last, which would be computationally expensive, backpropagation utilizes the information from the later layers
      first. This information is then used for the earlier layers, significantly reducing the computational cost. The
      backpropagation algorithm can be defined as:
      <TextPlaceholder height={10} />
      <ol>
        <li>
          For an input {latexFormula("\\textcolor{orange}{\\vec{x}_n}")} propagate forward through the network computing
          all activations of hidden and output units using:
          <div className="centered-text-container">
            {latexFormula("\\textcolor{tomato}{a_j = \\displaystyle \\sum_i w_{ij}z_i}")}
            <TextPlaceholder height={10} />
            {latexFormula("\\textcolor{steelblue}{z_j = h(a_j)}")}
          </div>
        </li>
        <li>Compute the node errors {latexFormula("\\delta_k")} for all the output units</li>
        <li>
          Backpropagate these node errors to obtain {latexFormula("\\delta_j")} for all the hidden units using the
          update rule:
          <div className="centered-text-container">{latexFormula("\\delta_j = h'(a_j) \\sum_k \\delta_k w_{jk}")}</div>
        </li>
        <li>
          Calculate the derivatives using
          <div className="centered-text-container">
            {latexFormula("\\displaystyle \\frac{\\partial E_n}{\\partial w_{ij}} = \\delta_j z_i")}
          </div>
        </li>
      </ol>
    </>
  );
}
