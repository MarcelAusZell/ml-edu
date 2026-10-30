import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      <div className="centered-text-container" style={{ fontSize: "0.7rem" }}>
        {latexFormula("\\textcolor{tomato}{a_j^{(l)} = \\displaystyle \\sum_i w_{ij}^{(l)}z_i^{(l-1)}}")}
      </div>
      <div className="centered-text-container" style={{ fontSize: "0.7rem" }}>
        {latexFormula("\\textcolor{steelblue}{z_j^{(l)} = h(a_j^{(l)})}")}
      </div>
      <div className="centered-text-container" style={{ fontSize: "0.7rem" }}>
        {latexFormula(
          "\\frac{\\partial E_n}{\\partial w_{ij}^{(l)}} = \\frac{\\partial E_n}{\\partial a_j^{(l)}} \\frac{\\partial a_j^{(l)}}{\\partial w_{ij}^{(l)}}"
        )}
      </div>
      <hr />
      As for {latexFormula("\\frac{\\partial E_n}{\\partial a_j^{(l)}}")} in{" "}
      {latexFormula(
        "\\frac{\\partial E_n}{\\partial w_{ij}^{(l)}} = \\frac{\\partial E_n}{\\partial a_j^{(l)}} \\frac{\\partial a_j^{(l)}}{\\partial w_{ij}^{(l)}}"
      )}{" "}
      we have to consider a more intricate relationship between the later nodes.
      <br />
      For now lets refer to {latexFormula("\\frac{\\partial E_n}{\\partial a_j^{(l)}}")} as to the node-error{" "}
      {latexFormula("\\delta_j")} such that
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\frac{\\partial E_n}{\\partial w_{ij}^{(l)}} = \\frac{\\partial E_n}{\\partial a_j^{(l)}} \\frac{\\partial a_j^{(l)}}{\\partial w_{ij}^{(l)}} = \\delta_j \\frac{\\partial a_j^{(l)}}{\\partial w_{ij}^{(l)}}"
        )}{" "}
      </div>
      <span className="note-text">
        The description of {latexFormula("\\delta_j")} as "node-error" will be clear in a moment
      </span>
    </>
  );
}
