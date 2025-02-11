import React from 'react';
import axios from '../../config/axios';
import {Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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

class Genere extends React.Component{
        constructor() {
            super()
            this.state = {
                genere:'',
                redirectList:false
            }
            this.handleChange=this.handleChange.bind(this)
            //this.passwordChange = this.passwordChange.bind(this)
        
        }
        handleChange(e) {
            e.persist()
            this.setState(() => ({
                [e.target.name]:e.target.value
        }))
        }
    
        genereChange = (e) => {
            const genere = e.target.value
            this.setState(() => ({ genere }))
        }
    
        handleSubmit=(e)=> {
            e.preventDefault()
            const formData = {
                genere: this.state.genere,
            }
            console.log(formData,'hi')
            axios.post('/genere', formData)
                .then((response) => {
                    console.log(response.data,"post")
                    this.props.history.push('/movies')
                })
                .catch((err) => {
                console.log(err,"out")
            })
    }
    
    render() {
        const classes = this.props;

        if (this.state.redirectList) {
          return <Redirect to='/movies'/>
                    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
                  Genere
           </Typography>
          {this.state.noticeMsg && <p>{this.state.noticeMsg}</p>}
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="genere"
            label="Genere"
            name="genere"
          autoComplete="username"
          value={this.state.genere}
            onChange={this.genereChange}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onChange={this.handleSubmit}
          >
                      Submit
                 </Button>
        </form>
      </div>
    </Container>
  );
}
}
export default Genere


