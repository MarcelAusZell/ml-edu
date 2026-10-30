import PageCard from "../../components/page-card/page-card";
import IntroductionCardAbout from "./introduction-card/introduction-card-about";
import "./about.scss";

export default function About() {
  return (
    <>
      <IntroductionCardAbout />
      <PageCard>
        <div className="about-this-page-text">
          <strong className="txt-1">ML-EDU</strong> is an attempt to provide a barrier-free access to an truly
          interactive and engaging learning experience in the field of machine learning and the result of a bachelor
          thesis made for the chair of Learning Technologies at RWTH Aachen University. The thesis was supervised by{" "}
          <a
            className="credit-txt"
            href="https://learntech.rwth-aachen.de/cms/learntech/das-lehr-und-forschungsgebiet/mitarbeiter/ehemalige-externe-mitarbeiterinnen-und-m/~jygg/matthias-ehlenz/?allou=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dr. rer. nat. Matthias Ehlenz
          </a>{" "}
          and devoloped by me, Marcel Sayegh during the summer semester 2024. The content displayed on this website is
          mainly based on the book{"  "}
          <a
            className="credit-txt"
            href="https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            "Pattern Recognition and Machine Learning" by Christopher Bishop
          </a>
          , though my current experience is also biased through the introductory course to machine learning by Prof. Dr.
          Bastian Leibe and Artificial Intelligence by Prof. Gerhard Lakemeyer at RWTH Aachen University. If you have
          any concerns about the content displayed on this website or any other questions regarding this project, please
          feel free to contact me at{" "}
          <a
            className="about-email"
            href="mailto:
      marcel.sayegh@rwth-aachen.de"
          >
            marcel.sayegh@rwth-aachen.de
          </a>
        </div>
      </PageCard>
    </>
  );
}
