import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      For now lets focus on choice of the loss function {latexFormula("L(t_n, y(\\vec{x}_n, \\vec{w}))")}. For our
      network training, we will have to know beforehand what kind of problem we are dealing with. Depending on the
      problem, we will have to choose the number of outputs, the output activation function and the loss function
      differently. For example, if given a regression problem where we are given inputs{" "}
      <div className="centered-text-container">
        {latexFormula("X = \\{\\vec{x}_1, \\vec{x}_2, \\ldots, \\vec{x}_N\\}, \\quad \\vec{x}_n \\in \\mathbb{R}^D")}
      </div>{" "}
      and corresponding target values
      <div className="centered-text-container">
        {latexFormula("T = \\{t_1, t_2, \\ldots, t_n\\}, \\quad \\vec{t}_n \\in \\mathbb{R}")}{" "}
      </div>
      where we map a multi-dimensional input to a single scalar output, we would need only one output unit. Since the
      targets are real-valued, we do not need to apply an activation function to the output layer. We use the identity
      function:
      <div className="centered-text-container">{latexFormula("y(\\vec{x}, \\vec{w}) = h^{(2)}(a) = a")}</div>
      We can use a squared error loss function
      <div className="centered-text-container">
        {latexFormula("L(t_n, y(\\vec{x}_n, \\vec{w})) = \\frac{1}{2}(t_n - y(\\vec{x}_n, \\vec{w}))^2")}
      </div>
    </>
  );
}
