import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text6() {
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
      we hence can again use the multi-dimensional chain rule to compute {latexFormula("\\delta_j")}:
      <div className="centered-text-container">
        {latexFormula(
          "\\delta_j = \\frac{\\partial E_n}{\\partial a_j} = \\sum_k \\frac{\\partial E_n}{\\partial a_k} \\frac{\\partial a_k}{\\partial a_j} = \\sum_k \\delta_k \\frac{\\partial a_k}{\\partial a_j}"
        )}
      </div>
      where we denote with {latexFormula("\\delta_k")} the node error for the activations {latexFormula("a_k")}.
      <br />
      We can compute {latexFormula("\\frac{\\partial a_k}{\\partial a_j}")} as follows:
      <div className="centered-text-container">
        {latexFormula(
          "\\frac{\\partial \\textcolor{tomato}{a_k}}{\\partial a_j} = \\frac{\\partial (\\textcolor{tomato}{\\sum_j w_{jk} z_j})}{\\partial a_j} = \\frac{\\partial (\\textcolor{tomato}{\\sum_j w_{jk} \\textcolor{steelblue}{h(a_j)}})}{\\partial a_j} = w_{jk} h'(a_j)"
        )}
      </div>
      As for {latexFormula("\\delta_k")}, which describes the output error we can write in the case of least-square error
      <div className="centered-text-container">
        {latexFormula(
          "\\delta_k = \\frac{\\partial E_n}{\\partial a_k} = \\frac{\\partial E_n}{\\partial y_k} = \\frac{\\frac{1}{2} \\sum_{k=1}^{K} (y_{k} - t_{k})^2}{\\partial y_k} = y_k - t_k"
        )}
      </div>
      so that we finally can express {latexFormula("\\frac{\\partial E_n}{\\partial w_{ij}}")} as:
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\frac{\\partial E_n}{\\partial w_{ij}} = \\delta_j z_i = (h'(a_j) \\sum_k \\delta_k w_{jk})  z_i"
        )}
      </div>
      <span className="note-text">
        The specific form of the error {latexFormula("\\delta_k")} depends on the choice of the error function and the
        activation function used for the output. Above we assumed the least-square error and no activation for the
        output layer.
      </span>
    </>
  );
}
