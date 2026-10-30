import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      The main reason to use non-linear activation functions is that without them, the model would simply perform a
      series of linear operations. Applying an activation function introduces non-linearity, which allows the network to
      learn and represent complex patterns. Without activation functions, all layers would collapse into a single linear
      model, negating the benefits of a deep architecture.
      <br />
      As to which activation function to use, there are several options available, some of which we have already seen in
      the previous sections. Popular choices include the sigmoid function {latexFormula("\\dots")}
      <div className="centered-text-container">{latexFormula("\\sigma(x) = \\frac{1}{1 + e^{-x}}")}</div>
    </>
  );
}
