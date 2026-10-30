import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text4() {
  return (
    <>
      <TextPlaceholder height={10} />
      <div style={{ textAlign: "center", fontSize: "0.7rem" }}>
        {latexFormula("\\textcolor{tomato}{a_j = \\displaystyle \\sum_i w_{ij} z_i}")}
        <TextPlaceholder height={10} />
        {latexFormula("\\textcolor{steelblue}{z_j = h(a_j)}")}
        <TextPlaceholder height={10} />
        {latexFormula(
          "\\frac{\\partial E_n}{\\partial w_{ij}} = \\frac{\\partial E_n}{\\partial a_j} \\frac{\\partial a_j}{\\partial w_{ij}} = \\delta_j \\frac{\\partial a_j}{\\partial w_{ij}}"
        )}
      </div>
      <hr /> To proceed further with the calculations of the weight derivatives, let us simplify the notation by
      dropping the superscripts and use the indices {latexFormula("i,j,k")} to denote the layers where the last layer{" "}
      {latexFormula("l")} shall be given by <TextPlaceholder height={15} />
      {latexFormula("k: (l)")}
      <br />
      the second last layer {latexFormula("(l - 1)")} by
      <br />
      {latexFormula("j: (l - 1)")}
      <br />
      and the layer before it {latexFormula("(l - 2)")} by
      <br />
      {latexFormula("i: (l - 2)")}
      <TextPlaceholder height={15} />
      This will allow us to write out the calculation of the weight derivative more compactly:
      <br />
      For {latexFormula("\\frac{\\partial a_j}{\\partial w_{ij}}")} we already concluded the simplicity of the
      derivative as
      <div className="centered-text-container">
        {latexFormula(
          "\\frac{\\partial \\textcolor{tomato}{a_j}}{\\partial w_{ij}} = \\frac{\\textcolor{tomato}{ \\sum_i w_{ij} z_i}}{\\partial w_{ij}} = z_i"
        )}{" "}
      </div>
      we thus have
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\frac{\\partial E_n}{\\partial w_{ij}} = \\frac{\\partial E_n}{\\partial a_j} \\frac{\\partial a_j}{\\partial w_{ij}} = \\delta_j z_i"
        )}
      </div>
    </>
  );
}
