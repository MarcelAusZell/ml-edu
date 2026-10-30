import PageCard from "../../../components/page-card/page-card.js";
import LinearRegressionInteractive from "./regression/interactive/linear-regression-interactive.js";
import RegressionScrollytelling from "./regression/regression-scrollytelling.js";
import InteractiveDemo from "../../../components/interactive-demo/interactive-demo.js";
import LeastSquareRegressionInteractive from "./least-square-regression/interactive/least-square-regression-interactive.js";
import RidgeRegression from "./ridge-regression/interactive/ridge-regression-interactive.js";
import RegressionVsClassificationScrollytelling from "./regression-vs-classification/regression-vs-classification-scrollytelling.js";
import LeastSquareRegressionScrollytelling from "./least-square-regression/least-square-regression-scrollytelling.js";
import RidgeRegressionScrollytelling from "./ridge-regression/ridge-regression-scrollytelling.js";
import IntroductionCardRegression from "./introduction-card/introduction-card-regression.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function LinearRegression() {
  return (
    <>
      <IntroductionCardRegression />
      <PageCard>
        <RegressionVsClassificationScrollytelling />

        <RegressionScrollytelling />
        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which will cause the model to find a line that minimizes
            the distances to your given samples.
          </div>
          <LinearRegressionInteractive svgWidth={1200} svgHeight={600} />
        </InteractiveDemo>

        <LeastSquareRegressionScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adjusting the degree of the polynomial model to see how it affects the
            model's fit to the data. Observe how the model starts to overfit the data as the degree becomes to
            high. Notice also that the RMSE reaches zero for a poor predictive model.
          </div>
          <LeastSquareRegressionInteractive svgWidth={1200} svgHeight={600} />
        </InteractiveDemo>

        <RidgeRegressionScrollytelling />
        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adjusting regulization strength and the polynomial degree to see how it
            affects the model's fit to the data.
          </div>
          <RidgeRegression svgWidth={1200} svgHeight={600} />
        </InteractiveDemo>
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/classification-and-regression/logistic-regression"
        nextSectionName="Logistic Regression"
        sources={[
          {
            title: "Linear Discriminants [All]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Linear Basis Function Models 3.1"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "Linear Discriminants [All]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Polynomial Curve Fitting 1.1"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
        ]}
      />
    </>
  );
}
