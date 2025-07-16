import React from "react";

import "./style.css";

const StarsPoints: React.FC<{
  points: number;
}> = ({ points }) => {
  return (
    <div className="flex flex-row">
  {[...Array(5)].map((_, i) =>
    i < points ? (
      <img
        key={i}
        src="/assets/landing/icon/cards/star-active.svg"
        alt="estrella activa"
      />
    ) : (
      <img
        key={i}
        src="/assets/landing/icon/cards/star-inactive.svg"
        alt="estrella inactiva"
      />
    )
  )}
</div>
  );
};

export default StarsPoints;
