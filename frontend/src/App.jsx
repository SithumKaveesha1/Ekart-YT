import React from "react";
import { Button } from "./components/ui/button";
import { UNSAFE_createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  {
    path : "/",
    element : <App />
  }



);

const App = () => {
  return (
    <div className="text-red-700 text-5xl font-bold">
      hello world
      <Button variant="outline" size="lg">
        Click me
      </Button>
    </div>
  );
};

export default App;