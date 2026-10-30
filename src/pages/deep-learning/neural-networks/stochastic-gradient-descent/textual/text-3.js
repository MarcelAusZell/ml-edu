import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      To put it simply, there is no guarantee that we will eventually reach a global minimum. But we can try to increase
      our chances of reaching it by using a different optimization algorithm called{" "}
      <span className="emphasized-text">Stochastic Gradient Descent</span>. Let us consider the following example of a
      non-convex function with one global minimum and two local minima
      <br />
      <span className="note-text">
        The function represented is the so-called Three Hump Camel Function
        <div className="centered-text-container">
          {latexFormula("f(x, y) = 2x^2 - 1.05x^4 + \\frac{x^6}{6} + xy + y^2")}
        </div>
      </span>
    </>
  );
}
