import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import { mainApiUrl, searchCharacterApiUrl } from "../helpers/apiUrls";
import DataGrid from "../Components/DataGrid";
import Navbar from "../Components/Navbar";
import { GetMainContext } from "../Contexts/MainContext";
import { createDisplayData } from "../helpers/utilities";
import { useNavigate } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GraphicalChart from "../Components/GraphicalChart";

const Details = () => {
  const {
    allCharacters,
    setAllCharacters,
    setTotalCharacters,
    setCharacterDetails,
    fullCharacterDetails,
    setFullCharacterDetails,
    storedCharacterData,
    allCharactersTotal,
    handleApiCall,
  } = GetMainContext();
  const [searchText, setSearchText] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const dataAlreadyFetched = storedCharacterData?.results?.length > 0;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: dataAlreadyFetched
      ? Math.floor(Math.max(0, storedCharacterData.offset) / 20)
      : 0,
  });

  const debouncedSearchText = useDebounce(searchText, 500);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/character`;
    navigate(path);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      await handleApiCall(mainApiUrl());
    };
    if (!dataAlreadyFetched) fetchCharacters();
  }, []);

  useEffect(() => {
    if ((debouncedSearchText || "").trim() === "") {
      if (dataAlreadyFetched) {
        setTotalCharacters(allCharactersTotal);
        setFullCharacterDetails(storedCharacterData.results);
        setAllCharacters(
          createDisplayData(
            storedCharacterData.results,
            storedCharacterData.offset
          )
        );
      }
      return;
    }
    const searching = async () => {
      const reqdUrl = searchCharacterApiUrl(debouncedSearchText);
      await handleApiCall(reqdUrl, 0, true);
    };
    searching();
  }, [debouncedSearchText]);

  const handleRowClick = (params) => {
    setCharacterDetails(
      fullCharacterDetails?.filter((i) => i.id === params?.row?.id)
    );
    routeChange();
  };

  const handlePaginationModelChange = (newPaginationModel) => {
    if (!((debouncedSearchText || "").trim() === "")) return;
    const reqdUrl = mainApiUrl(newPaginationModel.page);
    handleApiCall(reqdUrl, newPaginationModel.page);
    setPaginationModel(newPaginationModel);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <Navbar />
      <ThemeProvider theme={darkTheme}>
        <div className="details-page">
          <div className="details-body md:mx-48 mx-8 mb-16">
            <div className="flex flex-col md:mt-12 my-8 ">
              <h3 className="font-bold md:mb-8 md:text-xl text-justify text-slate-300">
                Below is a data table featuring a roster of 20 Marvel
                characters. Each page conveniently displays 20 entries, and
                clicking on any row will seamlessly transport the user to the
                respective character's profile page. <br />
                <br /> Additionally, it incorporates a real-time search feature
                that empowers users to swiftly locate characters by their name.
              </h3>
              <div className="md:flex justify-start items-center gap-8">
                <h3 className="font-bold flex-1 py-4 md:text-xl text-slate-300">
                  To compare characters by the number of comics they've appeared
                  in, simply click this button 👉
                </h3>
                <Button
                  size="large"
                  variant="contained"
                  endIcon={
                    showChart ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  }
                  color="error"
                  onClick={() => setShowChart((p) => !p)}
                >
                  {showChart ? "Hide Chart" : "Show Chart"}
                </Button>
              </div>
              {showChart && (
                <p className="italic md:font-semibold text-slate-300/50 mt-4">
                  You can enable or disable characters in the graphical
                  representation by clicking on the label names. Chart data
                  remains unchanged during search operations.
                </p>
              )}
            </div>
            {showChart && <div className="max-w-5xl mx-auto"><GraphicalChart /></div>}
            <TextField
              fullWidth
              variant="outlined"
              color="error"
              margin="normal"
              size="medium"
              placeholder="Search Marvel character here (eg. Thor, Hulk, etc.)"
              value={searchText || ""}
              onChange={(event) => {
                event.preventDefault();
                setSearchText(event.target.value);
              }}
              className="mt-12"
            />
            {searchText &&
              searchText.trim() !== "" &&
              allCharacters &&
              (allCharacters || []).length === 0 && (
                <p className="mt-8 font-bold">
                  No character found. Please try another name.
                </p>
              )}
            <DataGrid
              paginationModel={paginationModel}
              handlePaginationModelChange={handlePaginationModelChange}
              handleRowClick={handleRowClick}
            />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Details;
