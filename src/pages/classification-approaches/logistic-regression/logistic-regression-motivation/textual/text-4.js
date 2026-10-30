import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text4() {
  return (
    <>
      Given this probabilistic model described through a linear discriminant function
      <div className="centered-text-container">
        {latexFormula("y_n = y(\\vec{x}_n) = p(\\mathcal{C}_1 \\mid \\vec{x}_n) =  \\sigma(\\vec{w}^T \\vec{x}_n)")}
      </div>
      we can now express the likelihood of the target labels {latexFormula(`\\vec{t}`)} given the weights{" "}
      {latexFormula(`\\vec{w}`)} and use a Maximum Likelihood Estimation (MLE) approach to find the optimal weights{" "}
      {latexFormula(`\\vec{w}`)}:
      <TextPlaceholder height={10} />
      {latexFormula(`p(\\vec{t} \\mid \\vec{w})`)}
      <TextPlaceholder height={10} />
      {latexFormula(`
          =
        \\displaystyle \\prod_{n=1}^{N} 
        \\begin{cases}
          p(\\mathcal{C}_1 \\mid \\vec{x}_n), & t_n =1 \\\\
          p(\\mathcal{C}_2 \\mid \\vec{x}_n), & t_n =0
        \\end{cases}`)}
      <TextPlaceholder height={10} />
      {latexFormula(`
        = 
        \\displaystyle \\prod_{n=1}^{N} 
        \\begin{cases}
          y_n, & t_n =1 \\\\
          (1-y_n), & t_n =0
        \\end{cases}`)}
      <TextPlaceholder height={10} />
      {latexFormula(` =  \\displaystyle \\prod_{n=1}^{N} y_n^{t_n} (1 - y_n)^{1 - t_n}`)}
      <br />
      <span className="note-text">
        Why {latexFormula(`p(\\vec{t} \\mid \\vec{w})`)}?
        <br />
        The core idea is still to find the weights {latexFormula(`\\vec{w}`)} that make our model's predictions as close
        as possible to the actual target labels in our training data. The likelihood function{" "}
        {latexFormula(`p(\\vec{t} \\mid \\vec{w})`)} measures how likely it is to observe the given set of target labels{" "}
        {""}
        {latexFormula("\\vec{t}")}
        {"  "} for the features {latexFormula("X")} in the training data, given a particular set of weights{" "}
        {latexFormula("\\vec{w}")}. To find the best weights{latexFormula("\\vec{w}")} , we aim to maximize the
        likelihood function{"  "}
        {latexFormula(`p(\\vec{t} \\mid \\vec{w})`)}. This means finding the weights that make the observed data (the
        target labels {"  "}
        {latexFormula("\\vec{t}")}) most probable according to our model.
      </span>
    </>
  );
}
