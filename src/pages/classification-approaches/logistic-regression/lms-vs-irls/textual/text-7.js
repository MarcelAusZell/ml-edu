import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      Though it converges much faster than the LMS update rule, the computation, as well as the inversion of the Hessian
      matrix {latexFormula("H")} is computationally expensive especially for large datasets. This is because the Hessian
      matrix is of size {latexFormula("D \\times D")} where {latexFormula("D")} is the number of features in the dataset
      and the inversion of a matrix is {latexFormula("\\mathcal{O}(D^3)")}
      <br />
      <span className="note-text">
        In practice, techniques such as Quasi-Newton methods (e.g., BFGS, L-BFGS), Stochastic Optimization (e.g., SGD,
        Adam), Conjugate Gradient methods, and Hessian-Free Optimization are often used to overcome these expensive
        computations.{" "}
      </span>
    </>
  );
}
