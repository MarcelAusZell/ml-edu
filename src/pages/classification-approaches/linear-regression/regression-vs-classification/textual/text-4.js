import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      {latexFormula("\\dots")} we can predict its corresponding value using the fitted regression model. This prediction
      is based on the learned relationship between the input features and the target values from the training data.
      <br />
      <span className="note-text">
        For example, we could model the relationship between the number of hours a student studies and their exam score.
        After fitting a regression model to the training data, we can predict the exam score of a new student based on
        the number of hours they studied. The model uses the training data to learn how study hours correlate with exam
        scores and hopefully make accurate predictions for new students.
      </span>
    </>
  );
}
