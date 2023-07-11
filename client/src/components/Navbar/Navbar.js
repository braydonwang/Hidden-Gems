import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar({ user, setUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setUser(null);
  };

  return (
    <header className="bg-amber-300">
      <DesktopNavbar
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        setUser={setUser}
        handleLogout={handleLogout}
      />
      <MobileNavbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        setUser={setUser}
        handleLogout={handleLogout}
      />
    </header>
  );
}
