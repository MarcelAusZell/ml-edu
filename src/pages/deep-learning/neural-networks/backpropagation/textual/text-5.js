import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text5() {
  return (
    <>
      <TextPlaceholder height={10} />
      <div style={{ textAlign: "center", fontSize: "0.7rem" }}>
        {latexFormula("\\textcolor{tomato}{a_j = \\displaystyle \\sum_i w_{ij} z_i}")}
        <TextPlaceholder height={10} />
        {latexFormula("\\textcolor{steelblue}{z_j = h(a_j)}")}
        <TextPlaceholder height={10} />
        {latexFormula(
          "\\frac{\\partial E_n}{\\partial w_{ij}} = \\frac{\\partial E_n}{\\partial a_j} \\frac{\\partial a_j}{\\partial w_{ij}} = \\delta_j z_i"
        )}
      </div>
      <hr />
      To proceed with the calculation of {latexFormula("\\frac{\\partial E_n}{\\partial a_j} = \\delta_j")} recall that
      the final error {latexFormula("E_n")} depends on the output activations:
      <div className="centered-text-container">{latexFormula("E_n(a_1, \\ldots, a_k, \\ldots, a_K)")}</div>
      which in turn depend on the activations {latexFormula("a_j")} in the layer before:
      <div className="centered-text-container" style={{fontSize: "0.8rem"}}>
        {latexFormula("E_n(a_1, \\dots, a_k(\\dots, a_j, \\dots), \\dots, a_K)")}
      </div>
    </>
  );
}
