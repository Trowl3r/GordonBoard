import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import "./styles/style.css";
import PluginPage from "./pages/PluginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="/:pluginId" element={<PluginPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App;
