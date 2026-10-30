import AIvsMLvsDSScrollytelling from "./ai-ml-ds/ai-ml-ds-scrollytelling";
import MLTypesScrollytelling from "./ml-types/ml-types-scrollytelling";
import PageCard from "../../components/page-card/page-card.js";
import IntroductionCardHome from "./introduction-card/introduction-card-home.js";
import RefferalToNextAction from "../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function Home() {
  return (
    <>
      <IntroductionCardHome />
      <PageCard>
        <AIvsMLvsDSScrollytelling />

        <MLTypesScrollytelling />
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/probability-density-estimation/bayes-decision-theory"
        nextSectionName="Bayes Decision Theory"
        sources={[
          {
            title: "AI vs. ML vs. DS [1]",
            description: ["AI vs. Machine Learning: Unraveling the Key Differences", "Data Science"],
            link: [
              "https://www.inspyrsolutions.com/ai-vs-machine-learning-key-differences/",
              "http://ronaldchichester.com/data-science",
            ],
          },
          {
            title: "Why ML? [2 - 3]",
            description: "Christopher Bishop - Pattern Recognition and Machine Learning",
            pages: ["Introduction p. 1-2"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "ML Steps [4 - 6]",
            description: "Christopher Bishop - Pattern Recognition and Machine Learning",
            pages: ["Introduction p. 2"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "Supervised vs. Unsupervised Learning [7 - 10]",
            description: "Christopher Bishop - Pattern Recognition and Machine Learning",
            pages: ["Introduction p. 3"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "ML Notation [11 - 13]",
            description: "Christopher Bishop - Pattern Recognition and Machine Learning",
            pages: ["Mathematical Notation xi - xii"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
        ]}
      />
    </>
  );
}
