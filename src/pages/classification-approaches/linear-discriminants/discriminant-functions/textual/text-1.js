import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      Until now, we have only considered probabilistic models for classification. However, we will now explore linear
      discriminants, which rely on an analytical decision function rather than combining probabilities to form a
      decision boundary. In this section, we will focus on one particular class of decision functions, namely <span className="emphasized-text">linear
      discriminants</span> of the form
      <div className="centered-text-container">{latexFormula("y(\\vec{x}) = \\vec{w}^T \\vec{x} + w_{0}")}</div>
      which is defined by a weight vector {latexFormula("\\vec{w}")} and a bias term {latexFormula("w_{0}")}. It will
      serve as the decision boundary between two classes.
      <br />
      In two dimensions, the decision boundary is a line. In three dimensions, it is a plane. In higher dimensions it is
      a hyperplane.
    </>
  );
}
