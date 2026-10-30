import latexFormula from "../../../../../utils/latex-formula";

export default function Text12() {
  return (
    <>
      While previously shown with a Gaussian kernel, the kernel density estimation can be done with other kernels
      aswell, e.g. a triangular kernel. The only conditions that the kernel must satisfy are:
      <br />
      <ul>
        <li>
          It must be non-negative: {latexFormula("k(u) \\geq 0")} {latexFormula("\\forall u")} and
        </li>
        <li>It must integrate to {latexFormula("1")}: {latexFormula("\\displaystyle\\int k(u)\\, du = 1")}</li>
      </ul>
    </>
  );
}
