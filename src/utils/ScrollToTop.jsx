import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This resets the window scroll to the very top (0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every time the path changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;