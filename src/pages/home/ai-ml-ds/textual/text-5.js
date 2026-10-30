import latexFormula from "../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      Running the machine learning algorithm on the training set will result in a function{" "}
      {latexFormula("\\vec{y}(\\vec{x})", "tomato")} which takes an image vector{" "}
      {latexFormula("\\vec{x}")} as input and returns an output vector {latexFormula("\\vec{y}")}{" "}
      encoded in the same way as the target vectors.
      <br />
      The exact form of the function {latexFormula("\\vec{y}(\\vec{x})")} is determined during the{" "}
      <span className="emphasized-text">training process</span>. How the function{" "}
      {latexFormula("\\vec{y}(\\vec{x})")} is constructed, and how it is tuned is the essence of
      machine learning and the focus of this course.
    </>
  );
}
