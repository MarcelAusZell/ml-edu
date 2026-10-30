import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      {latexFormula("\\dots")} and then iteratively updating the weights in the opposite direction of the gradient. As
      we will see later on these two last steps are not as straightforward as they might have been in the previous
      sections.
    </>
  );
}
