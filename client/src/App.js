import React, { Component } from 'react';
import axios from './config/axios'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Login from './components/user/login'
import Logout from './components/user/logout'
import Genere from './components/genere/Genere'
import ListMovies from './components/movies/ListMovies'
 import NewMovies from './components/movies/NewMovies'
import EditMovie from './components/movies/EditMovie';
import ShowMovie from './components/movies/ShowMovies'
import Register from './components/user/register';
import PropTypes from 'prop-types';
import { withStyles,fade,withStyle } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = withStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
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
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      logout: false,
      
    }
  }
  handleLogin = () => {
    this.setState(() => ({
      // login: true, logout: false
    }))
  }
  handleLogout = () => {
    this.setState(() => ({
      // login: false, logout: true
    }))
  }
  // handleInput = (e) => {
  //   const name=e.target.value
  //   console.log(name)
  //   axios.get(`/movies/name?title=${name}`, {
  //     headers: {
  //     'x-auth':localStorage.getItem('token')
  //     }
  // })
  //     .then((response) => {
  //       const movie = response.data
  //         console.log(movie)
  //     })
  //     .catch((err) => {
  //     console.log(err)
  // })
  // }

  render() { 
    let login = false;
     let logout = false;
        if (localStorage.getItem("token")) {
            login = true;
        } else {
            logout = true;
        }
    const { classes } = this.props;
    return ( 
      <BrowserRouter>
        <div>
          <AppBar position="static" color="primary">
        <Toolbar >
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow} >
            Cinema-world
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
                <InputBase
                  // value={`${this.state.movie}`}
                  type="text"
                  placeholder="Search…"
                  onChange={this.handleInput}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
              {logout && <Button color="primary" ><Link style={{ marginLeft: "5px" }} className="btn-primary" to="/users/register" >Register</Link></Button>}
              {logout && <Button color="primary" > <Link style={{ marginLeft: "5px" }} className="btn-primary"  to='/users/login'>login</Link></Button>}
              {login && <Button color="primary" > <Link style={{ marginLeft: "5px" }} className="btn-primary" to="/generes">genere</Link></Button>}
             {login && <Button color="primary" ><Link style={{ marginLeft: "5px" }} className=" btn-primary" role="button" to='/movies'> list movies</Link></Button>}
             {login && <Button color="primary" > <Link style={{ marginLeft: "5px" }} className="btn-primary"  role="button" to='/users/logout'>logout</Link></Button>}
           </Toolbar>
      </AppBar><br/><br/>
        
          {/* <Switch> */}
            <Route path="/generes" component={Genere} exact={true}  />
            <Route path='/users/register' component={Register}exact={true}  />
            <Route path='/users/login'  render={props => {
              return (<Login
                {...props} handleLogin={this.handlelogin} />)
            }} exact={true} />
            <Route path='/users/logout'  render={props => {
              return (<Logout
                {...props} handleLogout={this.handlelogout} />)
            }} exact={true} />
            <Route path='/movies' component={ListMovies} exact={true} />
            <Route path='/movies/new' component={NewMovies} exact={true} />
            <Route path='/movies/edit/:id' component={EditMovie} exact={true} /> 
            <Route path='/movies/:id' component={ShowMovie} exact={true} />
          {/* </Switch> */}
        </div> 
        </BrowserRouter>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (styles)(App);
