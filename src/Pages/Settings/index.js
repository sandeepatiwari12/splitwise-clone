import React from "react";
import Button from "../../Components/Button";
import useThemeMode from "../../utils/Hooks/useThemeMode";

const Settings = () => {
  const { theme, themeToggler } = useThemeMode();
  return (
    <div>
      <h3>Update the theme</h3>
      <Button onClick={themeToggler}>
        {theme === "light" ? "Dark Theme" : "Light Theme"}
      </Button>
    </div>
  );
};

export default Settings;
