import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      However, in practice, we often do not know the exact form of the prior or likelihood probabilities. In such cases,
      we can estimate these probabilities from the data. Assuming we have a supervised learning case where the data and
      the class labels are given, {latexFormula("...")}
    </>
  );
}
