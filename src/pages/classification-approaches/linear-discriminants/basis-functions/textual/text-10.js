import latexFormula from "../../../../../utils/latex-formula";

export default function Text10() {
  return (
    <>
      The polynomial basis function for the 2D case now has the form{" "}
      <div className="centered-text-container">
        {latexFormula("\\phi{(x)} = (x_1^2, x_2^2, x_1x_2, x_1, x_2, 1)^\\top")}
      </div>
    </>
  );
}
