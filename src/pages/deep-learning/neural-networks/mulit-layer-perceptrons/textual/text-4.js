import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      The outputs of the hidden layer are again linearly combined to obtain the output activations:
      <div className="centered-text-container">
        <span className="txt-2">{latexFormula("a_k = \\displaystyle \\sum_{j=0}^{M} w_{kj}^{(2)} z_j")}</span>
      </div>
      <span className="note-text">
        {latexFormula("\\vec{a} = [a_1, \\dots, a_K]^\\top= W^{(2)}h^{(1)}(W^{(1)}\\vec{x})")}
      </span>
    </>
  );
}
