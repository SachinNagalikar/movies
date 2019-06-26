import React from 'react';
import axios from '../../config/axios';
import {Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
        },
      
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// export default function SignIn() {
//   const classes = useStyles();

class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            email: '',  
            password: '',
            redirectList:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        //this.passwordChange = this.passwordChange.bind(this)
    
    }
    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name]:e.target.value
    }))
    }
    
    emailChange (e) {
        const email = e.target.value
        this.setState(()=>({email}))
    }
    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    handleSubmit=(e)=> {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password:this.state.password
        }
        console.log(formData)
        axios.post('/users/login', formData)
            .then((response) => {
                const {
                    token } = response.data
                localStorage.setItem('token', token)
                this.props.history.push('/movies')
                this.props.handlelogin()
            })
            .catch((err) => {
            console.log(err)
        })
    }
    render() {
        const classes = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
                  Login
           </Typography>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          autoComplete="email"
          value={this.state.email}
          onChange={this.emailChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
              id="password"
            value={this.state.password}
             onChange={this.passwordChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onChange={this.handleSubmit}
          >
                      Login
                 </Button>
        </form>
      </div>
    </Container>
  );
}
}
export default Login