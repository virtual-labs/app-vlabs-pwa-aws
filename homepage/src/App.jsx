import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Paper } from "@mui/material";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import OrderTable from "./components/OrderTable";
import ColorSchemeToggle from "./components/ColorSchemeToggle";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Divider from "@mui/joy/Divider";
import Tab from "@mui/joy/Tab";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import customTheme from "./theme";
import Intro from "./components/intro";
import "./css/intro.css";

export default function JoyOrderDashboardTemplate() {
  const [index, setIndex] = React.useState(1);
  const [experiments, setExperiments] = React.useState([]);
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    // fetch('https://api.npoint.io/17dfb67f927e1f6f5304')
    //   .then(resp => resp.json())
    //   .then(data => {

    //   setExperiments(data);
    // });

    fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
      .then((resp) => resp.json())
      .then((data) => {
        setExperiments(data);
      });
  }, []);

  function filterData() {
    if (index === 0) {
      let historyStack = localStorage.getItem("history");
      if (!historyStack) return [];

      historyStack = JSON.parse(historyStack);
      historyStack.reverse();
      return historyStack;
    } else if (index === 1) {
      return experiments;
    }
  }

  React.useEffect(() => {
    setResults(filterData());
  }, [experiments, index]);

  return (
    <CssVarsProvider disableTransitionOnChange theme={customTheme}>
      <GlobalStyles
        styles={{
          "[data-feather], .feather": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em",
          },
        }}
      />
      <CssBaseline />
      <Box
        sx={{
          margin: "0",
          padding: "0",
          display: { xs: "none", md: "block" },
        }}
      >
        <Intro />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            px: { xs: 2, md: 6 },
            pt: { xs: 3, sm: 3, md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 1,
          })}
        >
          <Box
            sx={{
              marginTop: { xs: "0", md: "66vh" },
            }}
          >
            <Typography
              level="h1"
              fontSize="xl4"
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img src="/logo-vlabs.webp" loading="lazy" alt="Image Missing" />
              Virtual Labs
            </Typography>
            <Divider
              sx={{
                display: { xs: "flex", md: "none" },
                mt: "7px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                mb: 2,
                gap: 2,
                flexWrap: "wrap",
                "& > *": {
                  // minWidth: "clamp(0px, (500px - 100%) * 999, 100%)",
                  // flexGrow: 1
                },
              }}
            >
              <Typography level="h1" fontSize="xl3">
                Virtual Experiments
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  "& > *": { flexGrow: 1 },
                  marginLeft: "auto",
                }}
              >
                <ColorSchemeToggle
                  sx={{
                    ml: "auto",
                    display: { xs: "inline-flex", md: "inline-flex" },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 1,
                gap: 2,
                flexWrap: "wrap",
                "& > *": {
                  // minWidth: "clamp(0px, (500px - 100%) * 999, 100%)",
                  // flexGrow: 1
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 1, "& > *": { flexGrow: 1 } }}>
                <Tabs
                  aria-label="Icon tabs"
                  defaultValue={0}
                  value={index}
                  onChange={(event, value) => setIndex(Number(value))}
                >
                  <TabList variant="outlined">
                    <Tab
                      variant={index === 0 ? "soft" : "plain"}
                      color={index === 0 ? "primary" : "neutral"}
                    >
                      <ListItemDecorator>
                        <HistoryIcon />
                      </ListItemDecorator>
                      Recents
                    </Tab>
                    <Tab
                      variant={index === 1 ? "soft" : "plain"}
                      color={index === 1 ? "primary" : "neutral"}
                    >
                      <ListItemDecorator>
                        <SearchIcon />
                      </ListItemDecorator>
                      All Experiments
                    </Tab>
                  </TabList>
                </Tabs>
              </Box>
            </Box>

            <OrderTable experiments={results} key={results} />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
