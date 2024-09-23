import React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Logo from "./Logo";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <Logo />
      <div className="flex items-center space-x-2">
        <Sun className="h-6 w-6 text-yellow-400" />
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        <Moon className="h-6 w-6 text-blue-300" />
      </div>
    </div>
  );
};

export default Header;
