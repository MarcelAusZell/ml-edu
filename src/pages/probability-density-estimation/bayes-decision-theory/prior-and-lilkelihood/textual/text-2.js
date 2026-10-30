import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      <span className="emphasized-text">
        The prior probability {latexFormula("p(\\mathcal{C}_k)")} expresses the probability of a class{" "}
        {latexFormula("\\mathcal{C}_k")} before we have seen any data.
      </span>
      <br />
      For example, we now a-priori that the letter {latexFormula("e")} is the most common
      letter in the English language, making up about 13% of all letters.
      <br />
      But for the sake of simplicity, we only consider two classes:
      <br />
      Let us assume for our exmaple that the prior probability for our two classes
      <br />
      {latexFormula("\\mathcal{C}_1 = a")} and {latexFormula("\\mathcal{C}_2 = b")} are
      <ul>
        <li>{latexFormula("p(\\mathcal{C}_1) = 0.75")} and</li>
        <li>{latexFormula("p(\\mathcal{C}_2) = 0.25")}</li>
      </ul>
    </>
  );
}
