import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/global-styles.ts";
import { AppRoutes } from "./routes/index.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
      <GlobalStyles />
      <AppRoutes />
    </>
  );
});
