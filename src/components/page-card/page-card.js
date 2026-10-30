import TextPlaceholder from "../../utils/text-placeholder";
import "./page-card.scss";

export default function PageCard({ children }) {
  return (
    <>
      <div className="page-container">
        {children}
      </div>
    </>
  );
}
