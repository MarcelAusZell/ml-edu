import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      For a multi-class classification problem where we are given inputs
      <div className="centered-text-container">
        {latexFormula("X = \\{\\vec{x}_1, \\vec{x}_2, \\ldots, \\vec{x}_N\\}, \\quad \\vec{x}_N \\in \\mathbb{R}^D")}
      </div>{" "}
      and corresponding target values{" "}
      <div className="centered-text-container">
        {latexFormula("T = \\{\\vec{t}_1, \\vec{t}_2, \\ldots, \\vec{t}_N\\}")}
      </div>{" "}
      where one target vector {latexFormula("\\vec{t}_n")} is a one hot encoded vector where only one element is{" "}
      {latexFormula("1")} and the rest are {latexFormula("0")} (e.g., {latexFormula("\\vec{t}_n = [0, 0, 1, 0]")} for{" "}
      {latexFormula("K=4")} classes), we would need
      {latexFormula("K")} output units. We can use the softmax activation function for the output layer:
      <div className="centered-text-container">
        {latexFormula("y_k(\\vec{x}, \\vec{w}) = h^{(2)}(a) = \\frac{\\exp(a_k)}{\\sum_{j=1}^{K} \\exp(a_j)}")}
      </div>
      as it normalizes the output to a probability distribution over {latexFormula("K")} classes. This allows us to
      interpret the output {latexFormula("y_k(\\vec{x}, \\vec{w})")}
      as the predicted probability {latexFormula("p(\\mathcal{C}_k|\\vec{x})")} that input {latexFormula("\\vec{x}")}{" "}
      belongs to class {latexFormula("C_k")}. We can use the softmax cross-entropy loss function:
      <div className="centered-text-container">
        {latexFormula("L(t_n, y(\\vec{x}_n, \\vec{w})) = -\\sum_{k=1}^{K} t_{n,k} \\ln(y_k(\\vec{x}_n, \\vec{w}))")}
      </div>
    </>
  );
}
