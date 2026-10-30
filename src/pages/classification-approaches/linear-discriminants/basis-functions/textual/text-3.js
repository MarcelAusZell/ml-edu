import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      While the usual case is that the basis function transforms the input features into a higher dimension, it is also
      possible that the basis functions transform the input features into a lower dimension. As in this example where we
      can use the mapping function{" "}
      <div className="centered-text-container">{latexFormula("\\phi{(\\vec{x})} = x_1^2 + x_2^2")}</div> to transform
      the input two-dimensional features into a one-dimensional feature space. While the data was not linearly separable
      in the original two-dimensional feature space, {latexFormula("\\dots")}
    </>
  );
}
