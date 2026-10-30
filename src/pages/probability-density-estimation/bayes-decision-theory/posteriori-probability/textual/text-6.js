import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text6() {
  return (
    <>
      Because of the normalization factor, the posterior probability is always between {latexFormula("0")} and{" "}
      {latexFormula("1")}, and we can make optimal decisions based on the posterior probabilities:
      <br />
      The optimal decision we can make to minimize misclassifications
      <TextPlaceholder height={2} />
      is to choose for {latexFormula("\\mathcal{C}_1")} if{" "}
      {latexFormula("p(\\mathcal{C}_1 \\mid x) > p(\\mathcal{C}_2 \\mid x)")}
      <TextPlaceholder height={2} />
      which again is the same as{" "}
      {latexFormula(
        "\\frac{p(x \\mid \\mathcal{C}_1)}{p(x \\mid \\mathcal{C}_2} > \\frac{p(\\mathcal{C}_2)}{p(\\mathcal{C}_1)} := \\theta"
      )}{" "}
      ("Likelihood Ratio Test")
      <TextPlaceholder height={2} />
      <span className="note-text">
        For multiple classes we would decide for {latexFormula("\\mathcal{C}_k")} if{" "}
        {latexFormula("p(\\mathcal{C}_k \\mid x) > p(\\mathcal{C}_j \\mid x)")} for all {latexFormula("j \\neq k")}
      </span>
    </>
  );
}
