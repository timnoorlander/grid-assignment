import { Navigate } from "react-router-dom";
import { paths } from "../constants/paths";

export function Home() {
  return <Navigate replace to={paths.PRODUCTS} />;
}
