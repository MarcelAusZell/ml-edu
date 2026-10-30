import PageCard from "../../../components/page-card/page-card.js";
import InteractiveDemo from "../../../components/interactive-demo/interactive-demo.js";
import GradientDescentInteractive from "./gradient-descent/interactive/gradient-descent-interactive.js";
import GradientDescentComparisonInteractive from "./gradient-descent/interactive/1st-vs-2st-gradient-descent.js";
import LogisticRegressionMotivationScrollytelling from "./logistic-regression-motivation/logistic-regression-motivation-scrollytelling.js";
import GradientDescentScrollytelling from "./gradient-descent/gradient-descent-scrollytelling.js";
import IRLSInteractive from "./lms-vs-irls/interactive/irls-interactive.js";
import LMSvsIRLSScrollytelling from "./lms-vs-irls/lms-vs-irls-scrollytelling.js";
import ClassificationApproachesComparison from "./why-logistic-regression/interactive/classification-approaches-comparison.js";
import WhyLogisticRegressionScrollytelling from "./why-logistic-regression/why-logistic-regression-scrollytelling.js";
import Latex from "react-latex-next";
import "./logistic-regression.scss";
import IntroductionCardLogisticRegression from "./introduction-card/introduction-card-logistic-regression.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function LogisticRegression() {
  return (
    <>
      <IntroductionCardLogisticRegression />
      <PageCard>
        <LogisticRegressionMotivationScrollytelling />

        <GradientDescentScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Observe how the 2<sup>nd</sup>-order-gradient-descent converges faster than the 1
            <sup>st</sup>
            -order-gradient-descent.
            <br /> Observe how the learning-rate influences the convergence/divergence of the 1
            <sup>st</sup>
            -order-gradient-descent
          </div>
          <div className="gradient-descent-component-container">
            <div className="gradient-descent-component">
              <GradientDescentComparisonInteractive />
            </div>
            <div className="gradient-descent-component">
              <GradientDescentInteractive />
            </div>
          </div>
        </InteractiveDemo>

        <LMSvsIRLSScrollytelling />

        <WhyLogisticRegressionScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Compare the classification approaches of Logistic Regression, Activated Least Squares
            and Least Squares
          </div>
          <ClassificationApproachesComparison svgWidth={600} svgHeight={600} />
          <div className="interactive-demo-description">
            The Logistic Regression model can also be used for data that is not linearly separable
            The model formulation is the same as above we just apply a feature transformation{" "}
            <Latex>{`$\\phi$`}</Latex> to the input data in form of basis functions (such as
            polynomial basis functions)
          </div>
          <IRLSInteractive svgHeight={600} svgWidth={600} />
        </InteractiveDemo>
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/deep-learning/neural-networks"
        nextSectionName="Neural Networks"
        sources={[
          {
            title: "Logistic Regression [All]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Probabilistic Discriminative Models 4.3"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "Errorfunctions [27-31]",
            description: ["Machine Learning - RWTH Aachen University- Prof. Leibe"],
            pages: ["Note on Errorfunctions p. 49-52"],
            link: "https://www.vision.rwth-aachen.de/media/course/SS/2016/machine-learning/ml16-part06-linear_discriminants2.pdf",
          },
        ]}
      />
    </>
  );
}
