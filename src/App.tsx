import routes from "@/routes/routes";
import { Profiler } from "react";
import { useRoutes } from "react-router";
const callback = (
  id,
  phase,
  actualDuration,
  startTime,
  baseDuration,
  commitTime
) => {
  console.log(
    "id " +
      id +
      " startTime " +
      startTime +
      " actualDuration " +
      actualDuration +
      " baseDuration " +
      baseDuration +
      " commitTime " +
      commitTime +
      " phase " +
      phase
  );
};
export default function App() {
  const element = useRoutes(routes);
  return (
    <Profiler id="App" onRender={callback}>
      {element}
    </Profiler>
  );
}
