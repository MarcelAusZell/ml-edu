import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      However, the choice of the regularization factor {latexFormula("\\lambda")} is not trivial. If chosen too small,
      the model will still overfit the data.
    </>
  );
}
