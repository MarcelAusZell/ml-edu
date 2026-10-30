import TextPlaceholder from "../../utils/text-placeholder";
import "./interactive-demo.scss";

export default function InteractiveDemo({ children }) {
  return (
    <>
      <TextPlaceholder height={100} />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 pt-3">
            <div className="interactive-demo-card mb-4">
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <TextPlaceholder height={100} />
    </>
  );
}
