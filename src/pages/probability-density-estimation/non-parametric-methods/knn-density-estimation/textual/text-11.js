import latexFormula from "../../../../../utils/latex-formula";

export default function Text11() {
  return (
    <>
      {latexFormula("...")} expanding a sphere and use {latexFormula("\\pi R_k^2(x)")} as the volume to get the
      probability density estimation
    </>
  );
}
