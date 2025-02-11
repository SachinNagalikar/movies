import React from "react";
import axios from "../../config/axios";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 500
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
}));

class FormMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title ? props.title : "",
      director: props.director ? props.director : "",
      genere: [],
      description: props.description ? props.description : "",
      year: props.year ? props.year : "",
      genreSelected: props.genere ? props.genere : "",
      image: ''
    };
    this.handleDirector = this.handleDirector.bind(this);
  }
  componentDidMount() {
    axios.get("/genere").then(response => {
      const genere = response.data;
      // console.log(genere);
      this.setState({ genere: response.data });
    });
  }
  //to be es6 arrow function based
  handleTitle = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  handleDirector(e) {
    const director = e.target.value;
    this.setState(() => ({ director }));
  }
  //bind in inline event handler
  handleGenere = e => {
    const genere = e.target.value;
    this.setState(() => ({ genere }));
  };
  handleDescription = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  handleYear = e => {
    const year = e.target.value;
    this.setState(() => ({ year }));
  };
  genreselecthandler = e => {
    const genreSelected = e.target.value;

    this.setState(() => ({ genreSelected }));
  };
  imageChange = e => {
    const image = e.target.files;
    this.setState(() => ({ image }));
  };
  handleSubmit = e => {
    e.preventDefault();

    let data = new FormData();
    data.append("title", this.state.title);
    data.append("director", this.state.director);
    data.append("genere", this.state.genreSelected);
    data.append("description", this.state.description);
    data.append("year", this.state.year);
    for (let file of this.state.image) {
      data.append("image", file);
    }
    
    this.props.handleMovieSubmission(data);
  };
  render() {
    console.log(this.state);
    const classes = this.props;

    if (this.state.redirectList) {
      return <Redirect to="/movies" />;
    }
    return (
      <Container component="main" maxWidth="xs" style={{border:'2px solid black',marginTop:"2%",padding:'50px'}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Movie
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}
>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Movie Name"
              name="title"
              autoComplete="title"
              value={this.state.title}
              onChange={this.handleTitle}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="director"
              label="Director"
              type="director"
              id="director"
              value={this.state.director}
              onChange={this.handleDirector}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
              value={this.state.description}
              onChange={this.handleDescription}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="year"
              label="Year"
              type="year"
              id="year"
              value={this.state.year}
              onChange={this.handleYear}
              autoFocus
            />
<br/>
<br/>
            <FormControl className={classes.formControl} fullWidth>
              <NativeSelect
                variant="outlined"
                margin="normal"
                required
                value={this.state.genreSelected}
                onChange={this.genreselecthandler}
                className={classes.selectEmpty}
              >
                <option>select</option>
                {this.state.genere.map(item => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.genere}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
            <br />
            <br />


            <Input
              type="file"
              multiple={true}
              name="image"
              value={this.state.file}
              onChange={this.imageChange}
              fullWidth
            />
            <br />
            <br/>
            <br/>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:"rgb(248, 68, 100)",color:'white'}}
              className={classes.submit}
            >
              Add
            </Button>
            <Button variant="outlined" fullWidth
            onClick={(e) => (window.location.href = "/movies")}
             style={{backgroundColor:"rgb(248, 68, 100)",color:'white'}}>
            Back
          </Button>
          </div>
          </form>
        </div>
      </Container>
    );
  }
}
export default FormMovie;
