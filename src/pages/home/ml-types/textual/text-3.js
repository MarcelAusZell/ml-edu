import latexFormula from "../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      Applications in which the training set contains only the input vectors {latexFormula("\\vec{x}_i")} but no target
      vectors {latexFormula("\\vec{t}_i")} are called <span className="emphasized-text">unsupervised learning</span>.
    </>
  );
}
