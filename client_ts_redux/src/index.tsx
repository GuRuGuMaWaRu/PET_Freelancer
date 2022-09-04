import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";
import Login from "./components/authorization/Login";
import Registration from "./components/authorization/Registration";
import ProjectForm from "./components/project_form/ProjectForm";
import ProjectList from "./components/projects/ProjectList";
import NotFound from "./components/pages/NotFound";
import PrivateRoutes from "./components/routing/PrivateRoutes";
import PublicRoutes from "./components/routing/PublicRoutes";
import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/global.styles";

import { store } from "./store/store";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}>
            <Route element={<PrivateRoutes />}>
              <Route element={<ProjectList />} index />
              <Route element={<ProjectList />} path="projects" />
              <Route element={<ProjectForm />} path="add" />
              <Route element={<ProjectForm />} path="project/:projectId" />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route element={<Login />} index />
              <Route element={<Login />} path="login" />
              <Route element={<Registration />} path="registration" />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
