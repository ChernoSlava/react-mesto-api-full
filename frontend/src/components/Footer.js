import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy;{new Date().getFullYear()} Mesto Turkey
      </p>
    </footer>
  );
}
