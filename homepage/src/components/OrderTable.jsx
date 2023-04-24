import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { ExperimentCard } from "./ExperimentCard.jsx";
import Fuse from "fuse.js";
import { Search, ArrowLeft, ArrowRight, Filter } from "react-feather";

import AOS from "aos";
import "aos/dist/aos.css";

const uniques = (myArray) =>
  myArray.filter((value, index, array) => array.indexOf(value) === index);

const RenderFilters = ({
  dispCategories,
  labCategories,
  setDiscipline,
  setLab,
}) => {
  const [categoryValue, setCategoryValue] = React.useState(null);
  const [labValue, setLabValue] = React.useState(null);

  return (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Discipline</FormLabel>
        <Box sx={{ width: "300px" }}>
          <Select
            value={categoryValue}
            onChange={(e, newValue) => {
              setDiscipline(newValue);
              setCategoryValue(newValue);
            }}
            placeholder="Filter on discipline..."
            {...(categoryValue && {
              // display the button and remove select indicator
              // when user has selected a value
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    // don't open the popup when clicking on this button
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setCategoryValue(null);
                    setDiscipline(null);
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
            sx={{ minWidth: 160 }}
          >
            {/* <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="fish">Fish</Option>
            <Option value="bird">Bird</Option> */}
            {dispCategories.map((category, i) => {
              return (
                <Option value={category} key={i}>
                  {category}
                </Option>
              );
            })}
          </Select>
        </Box>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Lab</FormLabel>
        <Box sx={{ width: "300px" }}>
          <Select
            value={labValue}
            onChange={(e, newValue) => {
              setLab(newValue);
              setLabValue(newValue);
            }}
            placeholder="Filter on Lab..."
            {...(labValue && {
              // display the button and remove select indicator
              // when user has selected a value
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    // don't open the popup when clicking on this button
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setLabValue(null);
                    setLab(null);
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
            sx={{ minWidth: 160 }}
          >
            {/* <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="fish">Fish</Option>
            <Option value="bird">Bird</Option> */}
            {labCategories.map((category, i) => {
              return (
                <Option value={category} key={i}>
                  {category}
                </Option>
              );
            })}
          </Select>
        </Box>
      </FormControl>

      {/* <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select placeholder="All">
          <Option value="all">All</Option>
        </Select>
      </FormControl> */}
    </React.Fragment>
  );
};

// @ts-ignore
export default function OrderTable(props) {
  const [experiments, setExperiments] = React.useState([]);
  const [discipline, setDiscipline] = React.useState(null);
  const [lab, setLab] = React.useState(null);

  const [results, setResults] = React.useState([]);

  const cardsPerIndex = 24;
  const [maxIndex, setMaxIndex] = React.useState(
    Math.ceil(props.experiments.length / cardsPerIndex)
  );
  const [pageIndex, setPageIndex] = React.useState(-1);
  const [paginated, setPaginated] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    AOS.init();

    // fetch('/data/not_all_experiments.json')
    //   .then(resp => resp.json())
    //   .then(data => {
    //     setExperiments(p => data);
    //     setResults(p => experiments);
    //   });

    setExperiments(props.experiments);
    // console.log(props.experiments);
  }, []);

  React.useEffect(() => {
    setResults(experiments);
  }, [experiments]);

  const options = {
    includeScore: false,
    keys: ["Experiment Name"],
  };

  React.useEffect(() => {
    const fuse = new Fuse(experiments, options);
    let newData = fuse.search(searchQuery).map((d) => d.item);
    if (!searchQuery) newData = experiments;

    const filtered = newData
      .filter((d) => (discipline ? d["Discipline Name"] === discipline : true))
      .filter((d) => (lab ? d["Lab Name"] === lab : true));

    // @ts-ignore
    setResults(filtered);
  }, [searchQuery, discipline, lab]);

  function nextIndex() {
    setPageIndex((pIndex) => {
      if (pIndex + 1 < maxIndex) return pIndex + 1;
      return pIndex;
    });
  }

  function previousIndex() {
    setPageIndex((pIndex) => {
      if (pIndex - 1 >= 0) return pIndex - 1;
      return pIndex;
    });
  }

  function setParticularIndex(i) {
    if (i >= 0 && i < maxIndex) setPageIndex((p) => i);
    return;
  }

  React.useEffect(() => {
    setPageIndex(0);
    setMaxIndex(Math.ceil(results.length / cardsPerIndex));
  }, [results]);

  React.useEffect(() => {
    setPaginated((p) =>
      results.slice(pageIndex * cardsPerIndex, (pageIndex + 1) * cardsPerIndex)
    );
  }, [results, pageIndex]);

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<Search />}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <Filter />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <RenderFilters
                dispCategories={uniques(
                  experiments.map((e) => e["Discipline Name"])
                )}
                labCategories={uniques(experiments.map((e) => e["Lab Name"]))}
                setDiscipline={setDiscipline}
                setLab={setLab}
              />
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: {
            xs: "none",
            sm: "flex",
          },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: {
              xs: "120px",
              md: "160px",
            },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for experiments</FormLabel>
          <Input
            placeholder="Search"
            startDecorator={<Search />}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />
        </FormControl>

        <RenderFilters
          dispCategories={uniques(experiments.map((e) => e["Discipline Name"]))}
          labCategories={uniques(experiments.map((e) => e["Lab Name"]))}
          setDiscipline={setDiscipline}
          setLab={setLab}
        />
      </Box>

      <Grid container spacing={2}>
        {
          // @ts-ignore
          paginated.map((experiment, i) => {
            return (
              <Grid xs={6} md={3} key={i}>
                <ExperimentCard data={experiment} />
              </Grid>
            );
          })
        }
      </Grid>

      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          pt: 2,
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => {
            previousIndex();
            window.scrollTo(0, 0);
          }}
          disabled={pageIndex === 0}
        >
          <ArrowLeft />
        </IconButton>
        <Typography level="body2" mx="auto">
          Page {pageIndex + 1} of {maxIndex ? maxIndex : 1}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => {
            nextIndex();
            window.scrollTo(0, 0);
          }}
          disabled={pageIndex + 1 === maxIndex || maxIndex === 0}
        >
          <ArrowRight />
        </IconButton>
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 4,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={<ArrowLeft />}
          onClick={() => {
            previousIndex();
            window.scrollTo(0, 0);
          }}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />

        <Typography level="body2" mx="auto">
          Page {pageIndex + 1} of {maxIndex ? maxIndex : 1}
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="plain"
          color="neutral"
          endDecorator={<ArrowRight />}
          onClick={() => {
            nextIndex();
            window.scrollTo(0, 0);
          }}
          disabled={pageIndex + 1 === maxIndex || maxIndex === 0}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
