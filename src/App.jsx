import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { AppRoute } from "./Routes";

function App() {

  return (
    <>
    <BrowserRouter>
      <Suspense>
        <AppRoute />
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
