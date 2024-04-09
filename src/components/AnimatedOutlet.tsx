import { useState } from "react";
import { useOutlet } from "react-router-dom";

export const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};
