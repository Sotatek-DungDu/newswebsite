
import { Outlet } from "react-router-dom";
import AppRouter from "./AppRouter";
import React from "react";
function App({ Component, pageProps }) {
  return (
    <>
      <AppRouter />

      <Outlet />
    </>
  );
}

export default App;
