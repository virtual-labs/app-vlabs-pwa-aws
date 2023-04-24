import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
import { Moon, Sun } from "react-feather";
import '../css/intro.css';

export default function ColorSchemeToggle({ onClick, sx, ...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...props}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
          // document.getElementsByClassName('hacker-left')[0].style.color = 'rgb(247, 229, 197)';
          document.getElementById('right-side').style.backgroundColor = 'rgb(73 156 132)';
          document.getElementById('left-side').style.backgroundColor = 'rgb(20 68 87)';
        } else {
          setMode("light");
          document.getElementById('right-side').style.backgroundColor = 'rgb(32, 241, 217)';
          document.getElementById('left-side').style.backgroundColor = 'rgb(118, 212, 248)';
        }
        onClick?.(event);
      }}
      sx={[
        {
          "& > *:first-child": {
            display: mode === "dark" ? "none" : "initial",
          },
          "& > *:last-child": {
            display: mode === "light" ? "none" : "initial",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Moon />
      <Sun />
    </IconButton>
  );
}
