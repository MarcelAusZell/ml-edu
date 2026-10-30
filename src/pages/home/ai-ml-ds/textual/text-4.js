import latexFormula from "../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      For these kind of problems, we can use a machine learning approach where given a large set of{" "}
      {latexFormula("N")} digits
      <br />
      {latexFormula("\\{\\vec{x}_1, \\vec{x}_2, ..., \\vec{x}_N\\}", "dodgerblue")}(
      <span style={{ color: "dodgerblue", fontWeight: "bold" }}> training set </span>)
      <br />
      and the corresponding labels
      <br />
      {latexFormula("\\{\\vec{t}_1, \\vec{t}_2, ..., \\vec{t}_N\\}", "orange")}(
      <span style={{ color: "orange", fontWeight: "bold" }}> target vectors </span>)
      <br />
      where {latexFormula("\\vec{t}_i")} is the digit corresponding to the image{" "}
      {latexFormula("\\vec{x}_i")}, we can tune the parameters of an adaptive model to ultimately be
      able to predict the digit for a new image.
      <br />
      <span className="note-text">
        There are different ways of representing the target vectors. For now we can assume that
        the target vector contains a single element, which is the digit itself.
      </span>
    </>
  );
}
