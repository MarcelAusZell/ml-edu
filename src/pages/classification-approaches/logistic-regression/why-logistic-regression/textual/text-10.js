import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text10() {
  return (
    <>
      Furthermore, it gives an almost linear penalty to misclassified data points which is much more desirable than the
      quadratic penalty of the squared error. The only caveat is that there is no closed form solution for the optimal
      weights such that we need to use an iterative optimization algorithm.
      <br />
      <span className="note-text">
        The cross-entropy error is also convex such that a unique minimum exists. It also has a nice probabilistic
        connection (minimizing the cross entropy corresponds to maximizing the posterior class probability).
      </span>
    </>
  );
}
