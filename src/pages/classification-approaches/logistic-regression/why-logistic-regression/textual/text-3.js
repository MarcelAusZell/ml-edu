import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text3() {
  return (
    <>
      So in total {latexFormula("2M + M(M+1) + 1 = M^2 + 3M + 1")} parameters are required to model the posterior probability
      <TextPlaceholder height={10} />
      {latexFormula(
        "p(\\mathcal{C}_1 \\mid \\vec{x}) =  \\frac{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1)}{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1) + p(\\vec{x} \\mid \\mathcal{C}_2) p(\\mathcal{C}_2)}"
      )}{" "}
      <TextPlaceholder height={10} />
      for a generative model {latexFormula("\\dots")}
    </>
  );
}
