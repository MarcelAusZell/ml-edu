import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      If we try to model the posterior probabilities directly, we can rewrite it in the following way:
      <br />
      <div style={{ marginBottom: "1rem" }}>{latexFormula("p(\\mathcal{C}_1 \\mid \\vec{x})")}</div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula("= \\displaystyle \\frac{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1)}{p(\\vec{x})}")}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula(
          "= \\displaystyle \\frac{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1)}{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1) + p(\\vec{x} \\mid \\mathcal{C}_2) p(\\mathcal{C}_2)}"
        )}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula(
          "= \\displaystyle \\frac{1}{1 + \\frac{p(\\vec{x} \\mid \\mathcal{C}_2) p(\\mathcal{C}_2)}{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1)}}"
        )}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula("=\\displaystyle \\frac{1}{1 + \\exp(-a)}  =: \\sigma(a)")}
      </div>
      so that for{" "}
      {latexFormula(
        "a = \\ln \\frac{p(\\vec{x} \\mid \\mathcal{C}_1) p(\\mathcal{C}_1)}{p(\\vec{x} \\mid \\mathcal{C}_2) p(\\mathcal{C}_2)}"
      )}{" "}
      the logistic sigmoid function is defined as a posterior probability.
    </>
  );
}
