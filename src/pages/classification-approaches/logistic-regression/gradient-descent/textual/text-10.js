import latexFormula from "../../../../../utils/latex-formula";

export default function Text10() {
  return (
    <>
      {latexFormula("\\dots")} which can even lead to divergence if chosen too large. So, both methods have their
      advantages and disadvantages, first-order gradient descent is computationally less expensive but heavily relies
      on the learning rate, Newton's method is computationally more expensive but converges faster.
    </>
  );
}
