import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      But as we are in the framework of neural networks we have{" "}
      {latexFormula("\\displaystyle E(\\vec{w}) = \\sum_{n=1}^{N} E_n(\\vec{w})")} we can choose one random sample{" "}
      {latexFormula("\\vec{x}_n")} from the training set and compute the gradient only based on this sample to update{" "}
      {latexFormula("\\vec{w}")}:
      <div className="centered-text-container">
        {latexFormula("\\vec{w}^{(\\tau+1)} = \\vec{w}^{(\\tau)} - \\eta \\nabla E_n(\\vec{w}^{(\\tau)})")}
      </div>
      This essentially describes an approximation of the gradient{" "}
      {latexFormula("\\nabla \\tilde{E}(\\vec{w}) = \\nabla E_n(\\vec{w})")}. It shows that even if we might reach a
      local minimum, the noisy nature of the gradient estimates, caused by using only a single sample, can help the
      optimization process escape local minima. This is a key advantage of stochastic gradient descent (SGD) over our
      previous approach, where we may get stuck in local minima due to the more precise but less exploratory nature of
      its updates. Moreover, computing the gradient based on a single sample is computationally more efficient than
      doing so for the entire training set. However, as with any (first-order) gradient-based optimization algorithm, it
      is crucial to choose the learning rate {latexFormula("\\eta")}
      carefully. If the learning rate is too small, the algorithm may converge slowly, while a learning rate that is too
      large can cause the algorithm to oscillate around local minima or even diverge entirely.
      <br />
      <span className="note-text">
        <ul>
          <li>
            Our previous approach is also known as batch gradient descent - computing the gradient based on the entire
            training set
          </li>
          <li>
            Instead of using a single sample, we can also use a small batch of {latexFormula("M")} samples to compute
            the gradient, which is known as mini-batch gradient descent
            {latexFormula("\\displaystyle \\nabla \\tilde{E}(\\vec{w}) = \\sum_{n=1}^{M} \\nabla E_n(\\vec{w})")} as
            some sort of middle ground between batch gradient descent and stochastic gradient descent, which is more
            stable than SGD but still computationally efficient
          </li>
        </ul>
      </span>
    </>
  );
}
