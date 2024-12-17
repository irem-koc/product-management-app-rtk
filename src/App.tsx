import routes from "@/routes/routes";
import { useRoutes } from "react-router";

export default function App() {
  const element = useRoutes(routes);
  return element;
}
