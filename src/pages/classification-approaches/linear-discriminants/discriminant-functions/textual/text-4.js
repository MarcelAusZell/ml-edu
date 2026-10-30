import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      It determines the orientation of the hyperplane/decision boundary.
      <br />
      <span className="note-text">
        In the case of two dimensions, the decision boundary is a simple line{" "}
        <div>
          {latexFormula(
            "0 = y(\\vec{x}) = \\vec{w}^T\\vec{x} + w_0 = w_1x_1 + w_2x_2 + w_0 \\iff x_2 = - \\frac{w_1}{w_2}x_1 -\\frac{w_0}{w_2} "
          )}
        </div>
        thus the weight vector {latexFormula("\\vec{w}^T")}
        controls the slope of the decision boundary.
      </span>
    </>
  );
}
