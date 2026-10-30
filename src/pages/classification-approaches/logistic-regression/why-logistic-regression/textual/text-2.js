import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      <ul>
        {latexFormula("\\dots")}
        <li>
          which then is adjusted by the prior probability of each class{" "}
          {latexFormula("p(\\mathcal{C_1}), p(\\mathcal{C_2})")}
          <ul>
            <li>
              which requires {latexFormula("1")} Parameter (because{" "}
              {latexFormula("1 = p(\\mathcal{C}_1) + p(\\mathcal{C_2})")})
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}
