import React, { useState, useEffect } from "react";
import Pi from "./Pi";
import Login from "./Login";

type Pin = {
  id: number;
  state: boolean;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return !isLoggedIn ? <Pi /> : <Login setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
