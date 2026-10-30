import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";
export default function Text5() {
  return (
    <>
      The probability density estimate at {latexFormula("x")} is then given by:
      <div className="centered-text-container">
        <span className="txt-2">{latexFormula("\\displaystyle \\frac{k}{N} \\cdot \\frac{1}{V_k(x)}")}</span>
      </div>
      where {latexFormula("V_k(x)")} is the volume of the hypersphere. This factor {latexFormula("V_k(x)")} is the key
      here:
      <br />
      The hypersphere represents the local neighborhood around point {latexFormula("x")}. A smaller hypersphere volume
      indicates a denser region (many neighbors are squeezed into a small space). Consequently, a larger hypersphere
      volume suggests a sparser region (neighbors are spread out over a bigger space).
      <br />
      <span className="note-text">
        <ul>
          <li>For the onedimensional case, the length of the line segment is {latexFormula("V_k(x) = 2R_k(x)")}</li>
          <li>The term {latexFormula("\\frac k N")} acts as a normalization factor.</li>
        </ul>
      </span>
    </>
  );
}
