import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      We take the radius <span style={{color: "orange"}}>{latexFormula("R_k(x)")}</span> of the hypersphere to be the distance from {latexFormula("x")} to the{" "}
      {latexFormula("k")}-th nearest neighbour.
    </>
  );
}
