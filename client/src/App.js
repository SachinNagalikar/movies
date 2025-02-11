import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import axios from "./config/axios";
import Login from "./components/user/login";
import Logout from "./components/user/logout";
import Genere from "./components/genere/Genere";
import ListMovies from "./components/movies/ListMovies";
import NewMovies from "./components/movies/NewMovies";
import EditMovie from "./components/movies/EditMovie";
import ShowMovie from "./components/movies/ShowMovies";
import Register from "./components/user/register";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    axios
      .get(`/movies/name?title=${e.target.value}`, {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <AppBar position="static" style={{ backgroundColor: "rgb(248, 68, 100)" }}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.root}>
              Cinema World
            </Typography>

            {/* Search Bar */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={handleSearch}
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                inputProps={{ "aria-label": "Search" }}
              />
            </div>

            {/* Navigation Buttons */}
            {!isAuthenticated ? (
              <>
                <Button style={{color:'white',margin:'5px'}} variant="outlined" onClick={(e) => (window.location.href ="/users/register")}>
                  Register
                </Button>
                <Button style={{color:'white',margin:'5px'}} variant="outlined" onClick={(e) => (window.location.href ="/users/login")}>
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button style={{color:'white',margin:'5px'}} variant="outlined" onClick={(e) => (window.location.href ="/generes")}>
                  Genres
                </Button>
                <Button style={{color:'white',margin:'5px'}} variant="outlined" onClick={(e) => (window.location.href ="/movies")}>
                  Movies
                </Button>
                <Button style={{color:'white',margin:'5px'}} variant="outlined" onClick={(e) => (window.location.href ="/users/logout")}>
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* Routes */}
        <Route path="/generes" component={Genere} exact />
        <Route path="/users/register" component={Register} exact />
        <Route path="/users/login" render={(props) => <Login {...props} />} exact />
        <Route path="/users/logout" render={(props) => <Logout {...props} />} exact />
        <Route path="/movies" component={ListMovies} exact />
        <Route path="/movies/new" component={NewMovies} exact />
        <Route path="/movies/edit/:id" component={EditMovie} exact />
        <Route path="/movies/:id" component={ShowMovie} exact />
      </div>
    </Router>
  );
};

export default App;
