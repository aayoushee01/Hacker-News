import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResultsAction,
  clearSearchResults,
  fetchMoreSearchResultsAction,
} from "../../reduxstore/actions";
import NavBar from "../common/NavBar";
import {
  List,
  ListItem,
  Box,
  TextField,
  Card,
  Skeleton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { timeDifference } from "../../utils/utility";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handleSearch = async () => {
    setIsLoading(true);
    setPage(0);
    dispatch(clearSearchResults());
    await dispatch(fetchSearchResultsAction(query, 1));
    setIsLoading(false);
  };

  const clearResultsAndReturnHome = () => {
    dispatch(clearSearchResults());
  };

  useEffect(() => {
    const handleLoadMore = async () => {
      setIsLoading(true);
      await dispatch(fetchMoreSearchResultsAction(query, page + 1));
      setPage(page + 1);
      setIsLoading(false);
    };
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, page, query, dispatch]);

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar onBrandClick={clearResultsAndReturnHome} />
      <Box className="container">
        <Box className="searchBar">
          <TextField
            id="outlined-basic"
            label="Search Hacker News..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Search Hacker News..."
            sx={{ margin: "10px" }}
            InputProps={{ style: { borderRadius: "15px" } }}
          />
          <SearchIcon
            onClick={handleSearch}
            sx={{ fontSize: 50 }}
            className="searchIcon"
          />
        </Box>
        <List style={{ marginTop: "20px", padding: 0, width: "100%" }}>
          {searchResults.map((result) => (
            <ListItem
              key={result.objectID}
              style={{ margin: "0px", paddingTop: "0px", paddingBottom: "0px" }}
            >
              <a
                href={`/post/${result.objectID}`}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Card
                  sx={{
                    borderRadius: "15px",
                    boxShadow: "none",
                    border: "1px solid #ccc",
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "row",
                    padding: "1rem",
                    gap: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body1" sx={{}} textAlign={"start"}>
                      {result.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={"grey"}
                      textAlign={"start"}
                      mt={"0.5rem"}
                    >
                      {result.author} • {timeDifference(result.created_at_i)} •{" "}
                      {result.points} points • {result.num_comments} coments
                    </Typography>
                  </Box>
                </Card>
              </a>
            </ListItem>
          ))}
          {isLoading &&
            Array.from({ length: 10 }, (_, index) => (
              <ListItem
                key={`skeleton-${index}`}
                style={{
                  margin: "0px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={60}
                  sx={{
                    borderRadius: "15px",
                    boxShadow: "none",
                    border: "1px solid #ccc",
                    marginBottom: "5px",
                    display: "flex",
                    flexDirection: "row",
                    padding: "1rem",
                    gap: "1rem",
                    cursor: "pointer",
                    width: "100%",
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default Home;
