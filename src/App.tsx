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
) => {};
export default function App() {
  const element = useRoutes(routes);
  return (
    <Profiler id="App" onRender={callback}>
      {element}
    </Profiler>
  );
}
