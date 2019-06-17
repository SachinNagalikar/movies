import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Login from './components/user/login'
import Logout from './components/user/logout'
import Genere from './components/genere/Genere'
import ListMovies from './components/movies/ListMovies'
 import NewMovies from './components/movies/NewMovies'
import EditMovie from './components/movies/EditMovie';
import ShowMovie from './components/movies/ShowMovies'
import Register from './components/user/register';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = {
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
};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      logout:false
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
          <AppBar position="static" color="secondary">
        <Toolbar >
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Cinema-world
          </Typography>
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

export default withStyles(styles)(App);
