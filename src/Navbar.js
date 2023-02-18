import React from "react";
import ConnectWallet from "./components/Navbar/ConnectWallet";
import Logo from "./components/Navbar/Logo";

function Navbar() {
  return (
    <div class="bg-gray-900 h-full flex justify-between items-center px-8 py-4">
      <Logo />
      <ConnectWallet />
    </div>
  );
}

export default Navbar;
