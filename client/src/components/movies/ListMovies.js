import React, { Component } from "react";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import ImageSlider from './slide'

const styles = withStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: "danger",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 70),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 500,


    }
  }
}));

class ListMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      search: ""
    };
  }
  componentDidMount() {
    axios
      .get("/movies", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState(() => ({
          movies: response.data
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSearch = e => {
    const movies = e.target.value.toLowerCase();

    this.setState(() => ({ search: movies }));
  };
  render() {
    const classes = this.props;
    let moviesSearch = [];
    if (this.state.search) {
      let searchMovies = [];
      this.state.movies.forEach(movie => {
        let moviename = movie.title.toLowerCase();
        let moviedirector = movie.director.toLowerCase();
        if (
          moviename.search(this.state.search) >= 0 ||
          moviedirector.search(this.state.search) >= 0
        ) {
          searchMovies.push(movie);
        }
      });
      if (searchMovies) {
        moviesSearch = searchMovies;
      }
    } else {
      moviesSearch = this.state.movies;
    }
    return (
      <React.Fragment>

        <CssBaseline />

        <main>
          {/* Hero unit */}
          <div>
            <Container>
              <div>
                <Grid container justify="center">
                  <Grid item>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <TextField
                          icon={<SearchIcon />}
                          style={{width:"100%"}}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="search"
                          label="Search"
                          type="search"
                          id="search"
                          value={this.state.search}
                          onChange={this.handleSearch}
                          autoFocus
                        />
                      </div>
                      <Button style={{color:'white',margin:'5px',backgroundColor:"rgb(248, 68, 100)"}} variant="outlined" onClick={(e) => (window.location.href ="/movies/new")}>
                     Add Movie
                    </Button>
                    </div>

                  </Grid>

                </Grid>
              </div>
            </Container>

          </div>
        </main>
        <ImageSlider />
        <main>
          <Container>
            {/* End hero unit */}
            <Grid container spacing={3}>
              {/* {console.log(this.state.movie)} */}
              {moviesSearch.map(movie => {
                return (
                  <Grid item key={movie._id}>
                    <Card className={classes.card}>
                      <img src={movie.image[0]} height="150" width="270" />
                      <CardContent className={classes.cardContent}>
                        <Typography>movie:{movie.title}</Typography>
                        <Typography>director:{movie.director}</Typography>
                        <Typography>description:{movie.description}</Typography>
                        <Typography>year:{movie.year}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          <Link to={`/movies/${movie._id}`}>view</Link>{" "}
                        </Button>
                        <Button size="small" color="primary">
                          <Link to={`/movies/edit/${movie._id}`}>Edit</Link>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
ListMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (styles)(ListMovies)
