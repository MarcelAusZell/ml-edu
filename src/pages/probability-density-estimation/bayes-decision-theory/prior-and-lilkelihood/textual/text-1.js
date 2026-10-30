import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      In this section, we want to use a probabilistic ML approach for classifying handwritten letters. We will use
      Bayes' decision theory We have two classes, {latexFormula("\\mathcal{C}_1 = a")} and{" "}
      {latexFormula("\\mathcal{C}_2 = b")}, and we want to classify a new letter {latexFormula("x")} as either{" "}
      {latexFormula("a")} or {latexFormula("b")}. Before we can do so, we need to define some probabilities:
    </>
  );
}
