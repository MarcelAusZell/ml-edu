import latexFormula from "../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
    Moreover the following notation will be used:
    <ul>
      <li>Scalar data:</li>
      <ul>
        <li>{latexFormula("x \\in \\mathbb{R}")}</li>
      </ul>
      <ul>
        <li>{latexFormula("\\mathcal{X} = \\{x_1, \\dots, x_N\\}")} or </li>
      </ul>
    </ul>
    </>
  );
}
