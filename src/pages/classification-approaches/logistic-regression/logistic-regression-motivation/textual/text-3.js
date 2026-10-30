import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      Because the posterior probabilities are described through the logistic sigmoid function, we have a way of
      connecting it to the framework of linear discriminants, where we already used the concept of generalized linear
      models in which the logistic sigmoid acted as an activation function{" "}
      {latexFormula("y(\\vec{x}) = \\sigma(\\vec{w}^T \\vec{x})")}. We can now express the posterior probabilities as a
      linear function of the input features{" "}
      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        {latexFormula("p(\\mathcal{C}_1 \\mid \\vec{x}) = y(\\vec{x}) = \\sigma(\\vec{w}^T \\vec{x})")}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        {latexFormula("p(\\mathcal{C}_2 \\mid \\vec{x}) = 1 - p(\\mathcal{C}_1 \\mid \\vec{x})")}
      </div>
      As we try to build a classification model but the logistic bounds the output to the range {latexFormula("[0, 1]")}{" "}
      the target labels are now {latexFormula("t \\in \\{0,1\\}")}.
      <br />
      <span className="note-text">
        <ul>
          <li>
            The bias term {latexFormula("w_0")} is already included in the formulation of{" "}
            {latexFormula("\\vec{w}^T\\vec{x}")}
          </li>
          <li>
            This Logistic Regression model assumes that the log-odds{" "}
            {latexFormula("a = \\ln \\frac{p(\\mathcal{C}_1 \\mid \\vec{x})}{p(\\mathcal{C}_2 \\mid \\vec{x})}")} can be
            expressed as a linear function of the input features {latexFormula("\\vec{w}^T\\vec{x}")}
          </li>
        </ul>
      </span>
    </>
  );
}
