import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text2() {
  return (
    <>
      {latexFormula("\\dots")} lead to {latexFormula("M")} linear combinations of the form{" "}
      <TextPlaceholder height={10} />
      <div className="txt-2" style={{ textAlign: "center" }}>
        {latexFormula("a_j =\\displaystyle \\sum_{i=0}^{D} w_{ji}^{(1)} x_i")}
      </div>
      <TextPlaceholder height={10} />
      which are referred to as activations.
      <br />
      <span className="note-text">
        The activations can also be written as a matrix multiplication: <br />
        {latexFormula("\\vec{a} = [a_1, \\dots, a_M]^\\top= W^{(1)}\\vec{x}")}
      </span>
    </>
  );
}
