import { useEffect, useState } from "react";
import Nav from "./pages/nav";
import { Outlet } from "react-router-dom";
import { api } from "./utils";
export default function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    api("/me").then((account) => {
      if (!account) {
        setAccount(null);
      }
    });
  }, []);
  return (
    <div>
      <Nav />
      <Outlet context={[account, setAccount]} />
    </div>
  );
}
