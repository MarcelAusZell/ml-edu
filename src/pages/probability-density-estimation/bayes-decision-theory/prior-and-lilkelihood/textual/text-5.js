import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      We can accumulate together with the training data, a distribution for the different values of {latexFormula("x")}. It shows how likely a certain
      value of {latexFormula("x")} is for a given class {latexFormula("\\mathcal{C}_k")}.
      <br />
      <span className="note-text">
        For example the handwritten style of ɑ is more common than a, resulting in a higher likelihood for feature vectors which describe
        the writing style of ɑ.
      </span>
    </>
  );
}
