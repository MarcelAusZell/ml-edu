import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      Although this answers the question of why to model the posterior probability directly, it still leaves open the
      question of why to use logistic regression—a probabilistic discriminative model—instead of a pure discriminative
      model, such as those covered in the section about linear discriminants. To see why logistic regression is a good
      choice, we can compare it against the discriminative models covered till now. We again use the error contribution
      plot to filter out the strengths and weaknesses of the models. The least squares classifier{" "}
      <div className="centered-text-container">
        {latexFormula("E(\\vec{w}) = \\frac{1}{2} \\displaystyle \\sum_{n=1}^{N} (y(\\vec{w} ; \\vec{x}) - t_n)^2")}
      </div>
      was simply to implement because of its closed-form solution, but it is sensitive to outliers {latexFormula("\\dots")}
      <br />
      <span className="note-text">
        Remember:
        <br />
        The error contribution plot governs
      </span>
    </>
  );
}
