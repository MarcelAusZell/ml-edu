import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      However, now that we are dealing with neural networks, which include highly non-linear functions, there is no
      longer the guarantee that the error function that is to be minimized is convex. That means we could have multiple
      local minima, and the global minimum may not be the one that the algorithm converges to. In other words, we could
      get stuck in a local minimum and never reach the most optimal solution
      <div className="centered-text-container">
        {latexFormula("\\vec{w}^{*} = \\underset{\\vec{w}}{\\arg\\min} \\; E(\\vec{w})")}
      </div>
      Naturally, the question arises of how to reach this global minimum.{" "}
    </>
  );
}
