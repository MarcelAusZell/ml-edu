import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      For an multi-layer perceptron with inputs {latexFormula("\\orange{x_0, \\ldots, x_i, \\ldots, x_D}")} which shall
      represent the {latexFormula("n^{th}")} training sample {latexFormula("\\vec{x}_n")} of a set of{" "}
      {latexFormula("N")} training samples, we have already familiarized ourselves with the forward propagation of the
      network, meaning the computation of the hidden activations {latexFormula("a_j^{(l)}")} and hidden units{" "}
      {latexFormula("z_j^{(l)}")}
      <div className="centered-text-container">
        {latexFormula("\\textcolor{tomato}{a_j^{(l)} = \\displaystyle \\sum_i w_{ij}^{(l)}z_i^{(l-1)}}")}
      </div>
      <div className="centered-text-container">{latexFormula("\\textcolor{steelblue}{z_j^{(l)} = h(a_j^{(l)})}")}</div>
      as well as the resulting outputs of the network{" "}
      {latexFormula("\\textcolor{forestgreen}{y_{1}, \\dots, y_{k}, \\dots y_{K}}")}.
      <br />
      These computations resulted in the formulation of an appropriate error function {latexFormula("E(\\vec{w})")}{" "}
      which (given the problem) usually consists of the sum of the errors of all the training samples
      <div className="centered-text-container">
        {latexFormula("E(\\vec{w}) = \\displaystyle \\sum_{n=1}^{N} E_n(\\vec{w})")}
      </div>
      where {latexFormula("E_n")} could describe the familiar squared error function such that
      <div className="centered-text-container">
        {latexFormula(
          "E(\\vec{w}) = \\displaystyle \\sum_{n=1}^{N} E_n(\\vec{w}) = \\displaystyle \\sum_{n=1}^{N} \\frac{1}{2} \\sum_{k=1}^{K} (y_{nk} - t_{nk})^2"
        )}
      </div>
      We now focus on the computation of {latexFormula("\\nabla E_n(\\vec{w})")} which will consists of evaluating the
      partial derivatives of the error function {latexFormula("E_n")} with respect to the weights{" "}
      {latexFormula("w_{ij}^{(l)}")} in all layers {latexFormula("l")} of the network:
      <div className="centered-text-container">
        {latexFormula(
          "\\nabla E_n(\\vec{w}) = \\displaystyle \\left\\{\\frac{\\partial E_n}{w_{ij}^{(l)}} \\right\\}_{\\forall i,j,l}"
        )}
      </div>
      The gradients{" "}
      <div className="centered-text-container" style={{fontSize: "0.8rem"}}>
        {latexFormula("\\nabla E_1(\\vec{w}), \\ldots, \\nabla E_n(\\vec{w}), \\ldots, \\nabla E_N(\\vec{w})")}
      </div>
      will then be used to update the weights of the network in a gradient descent fashion to ultimately minimize the
      error function {latexFormula("E(\\vec{w})")}, thus improving the performance of our deep learning model. We will
      now derive the concept of an algorithm called backpropagation to compute the gradients{" "}
      {latexFormula("\\nabla E_n(\\vec{w})")} in a efficient manner.
      <span className="note-text">
        <ul>
          <li>
            In the following, we will omit for the most part the notation of the {latexFormula("n^{th}")} training
            sample for simplicity, e.g.{" "}
            {latexFormula(
              "\\frac{1}{2} \\sum_{k=1}^{K} (y_{nk} - t_{nk})^2 = \\frac{1}{2} \\sum_{k=1}^{K} (y_{k} - t_{k})^2"
            )}
          </li>
          <li>
            For the next steps, we will use the concept of the multi-dimensional chain rule{" "}
            {latexFormula(
              "\\frac{\\partial f(g_1(x), \\ldots, g_D(x))}{\\partial x} = \\sum_{d=1}^{D} \\frac{\\partial f(g_1(x), \\ldots, g_D(x))}{\\partial g_d(x)} \\frac{\\partial g_d(x)}{\\partial x}"
            )}
            to compute the derivatives of the error function.
            <br />
            Be sure to understand it first!
          </li>
        </ul>
      </span>
    </>
  );
}
