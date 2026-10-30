import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      <span className="emphasized-text">
        The likelihood {latexFormula("p(x \\mid \\mathcal{C}_k)")} expresses the probability of observing a certain
        feature {latexFormula("x")} given that the class is {latexFormula("\\mathcal{C}_k")}.
      </span>
      <br />
      {latexFormula("x")} in this case, is a feature vector that measures some properties of the letter, let's say the
      count of filled pixels.
      <br />
      <span className="note-text">
        We could use different properties to describe the letter, e.g., its maximum height, aspect ratio, etc.{" "}
      </span>
    </>
  );
}
