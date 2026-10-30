import latexFormula from "../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      Applications in which the training set contains besides the input vectors {latexFormula("\\vec{x}_i")} also the
      corresponding target vectors {latexFormula("\\vec{t}_i")} are called{" "}
      <span className="emphasized-text">supervised learning</span>
      <br />
      Scenarios in which the goal is to assign to one of finitely many categories are called{" "}
      <span className="emphasized-text" style={{opacity: 0.5}}>classification</span> problems. For example, classifying an input vector{" "}
      {latexFormula("\\vec{x}")} into one of {latexFormula("K")} classes such as:
      <ul>
        <li>{latexFormula("\\texttt{0,...,9}")},</li>
        <li>
          <span style={{ color: "orange" }}>orange</span>, <span style={{ color: "tomato" }}>tomato</span>,
        </li>
        <li>cat, dog,</li>
        <li>...</li>
      </ul>
    </>
  );
}
