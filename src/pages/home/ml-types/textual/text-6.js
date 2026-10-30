import latexFormula from "../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      <ul>
        <li>Vector data:</li>
        <ul>
          <li>{latexFormula("\\vec{x} \\in \\mathbb{R}^D")}</li>
        </ul>
        <ul>
          <li>{latexFormula("\\mathcal{X} = \\{\\vec{x}_1, \\dots, \\vec{x}_N\\}")}</li>
        </ul>
      </ul>
    </>
  );
}
