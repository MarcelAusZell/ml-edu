import latexFormula from "../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      After the function/model {latexFormula("\\vec{y}(\\vec{x})")} is trained, it can be used to predict the identity
      of a set of new images which were not part of the training set, the so called{" "}
      <span style={{ color: "darkkhaki", fontWeight: "bold" }}>test set</span>. <br />
      The ability to classify new images <span style={{ color: "mediumseagreen", fontWeight: "bold" }}>
        correctly
      </span>{" "}
      is a measure of the quality of the model and is called <span className="emphasized-text">generalization</span>
    </>
  );
}
