import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      <div className="centered-text-container" style={{ fontSize: "0.7rem" }}>
        {latexFormula("\\textcolor{tomato}{a_j^{(l)} = \\displaystyle \\sum_i w_{ij}^{(l)}z_i^{(l-1)}}")}
      </div>
      <div className="centered-text-container" style={{ fontSize: "0.7rem" }}>
        {latexFormula("\\textcolor{steelblue}{z_j^{(l)} = h(a_j^{(l)})}")}
      </div>
      <hr />
      The gradient of an arbitray weight {latexFormula("w_{ij}^{(l)}")} is given by the chain rule:
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\frac{\\partial E_n}{\\partial w_{ij}^{(l)}} = \\frac{\\partial E_n}{\\partial a_j^{(l)}} \\frac{\\partial a_j^{(l)}}{\\partial w_{ij}^{(l)}}"
        )}{" "}
      </div>
      for which we can compute{" "}
      {latexFormula("\\frac{\\partial \\textcolor{tomato}{a_j^{(l)}}}{\\partial w_{ij}^{(l)}}")} easily by taking the
      derivative of {latexFormula("\\textcolor{tomato}{a_j^{(l)}}")} with respect to {latexFormula("w_{ij}^{(l)}")}.
    </>
  );
}
