import { useRoutes } from "react-router";
import routes from "./routes/routes";

export default function App() {
  const element = useRoutes(routes);
  return element;
}
