import { Link } from "react-router";

import { usePuterStore } from "../lib/puter";

type NavbarProps = {
  showUpload?: boolean;
  showWipe?: boolean;
};

const Navbar = ({
  showUpload = true,
  showWipe = true,
}: NavbarProps) => {
  const { auth } = usePuterStore();

  const handleLogout = async () => {
    await auth.signOut();
  };
  
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMEIQ</p>
      </Link>

      {showUpload && (
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
      )}

      {auth.isAuthenticated ? (
        <button onClick={handleLogout} className="primary-button w-fit">
          Logout
        </button>
      ) : (
        <Link to="/auth" className="primary-button w-fit">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
