import { useEffect } from "react";
import Home from "./pages/home";
import { Themes } from "./lib/enums";
import { useThemeStore } from "./stores";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "./pages/board";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:roomId",
    element: <Board />,
  },
]);

function App() {
  const theme = useThemeStore(state => state.theme)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Themes.Light, Themes.Dark);
    if (theme === Themes.System) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? Themes.Dark
        : Themes.Light;
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  return (
    <div className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-950">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
