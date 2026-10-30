import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      The last step in the process of training a neural network is to update the weights of the network
      <div className="centered-text-container">
        {latexFormula("\\vec{w}^{(\\tau+1)} = \\vec{w}^{(\\tau)} - \\eta \\nabla E(\\vec{w}^{(\\tau)})")}
      </div>
      to eventually arrive to a set of optimal parameters (weights that minimize the error function):
      <div className="centered-text-container">
        {latexFormula("\\vec{w}^{*} = \\underset{\\vec{w}}{\\arg\\min} \\; E(\\vec{w})")}
      </div>
      Our usual approach of using the simple iterative method of gradient descent has worked quite well up to this
      point. This is because the functions that we minimized, such as the cross-entropy loss function in the chapter on
      logistic regression, were convex functions. That means that there is only one minimum, and it is the global
      minimum.
    </>
  );
}
