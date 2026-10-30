import latexFormula from "../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      <ul>
        {" "}
        <li>Class labels:</li>
        <ul>
          <li>
            {latexFormula("\\mathcal{C}_1", "orange")}, {latexFormula("\\mathcal{C}_1", "steelblue")}, ...
          </li>
        </ul>
        <li>Labelled datasets:</li>
        <ul>
          <li>{latexFormula("\\mathcal{D} = \\{(x_1, t_1), \\dots, (x_N, t_N)\\}")}</li>
        </ul>
        <li>Matrices:</li>
        <ul>
          <li>{latexFormula("X \\in \\mathbb{R}^{m \\times n}")}</li>
        </ul>
        <li>Dot product:</li>
        <ul>
          <li>{latexFormula("\\displaystyle \\vec{w}^T \\vec{x} = \\sum_{j=1}^{D} w_j x_j")}</li>
        </ul>
      </ul>
    </>
  );
}
