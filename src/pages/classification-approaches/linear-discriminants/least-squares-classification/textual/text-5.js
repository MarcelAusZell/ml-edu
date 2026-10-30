import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      It therefore is <span style={{ color: "green" }}>positive if the classification is correct</span> and{" "}
      <span style={{ color: "red" }}>negative if the classification is incorrect</span>. In other words the sign of{" "}
      {latexFormula("z_n")} indicates if the classification was correct or not.
      <br />
      <span className="note-text">
        Remember: {latexFormula("y(x_n) > 0")} will lead to a classification of class {latexFormula("\\mathcal{C}_1")}{" "}
        and {latexFormula("y(x_n) < 0")} to a classification of class {latexFormula("\\mathcal{C}_2")} so if the
        prediction results in {latexFormula("y(x_n) < 0")} but {latexFormula("t_n = 1")} (or{" "}
        {latexFormula("y(x_n) > 0")} but {latexFormula("t_n = -1")}) the classification was incorrect and vice versa.
      </span>
    </>
  );
}
