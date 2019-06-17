// import React from 'react'
// import {Link} from 'react-router-dom'
// import axios from '../../config/axios';
// class ListMovies extends React.Component{
//     constructor() {
//          super() 
//         this.state = {
//             movies:[] 
//         }
//     }
//     componentDidMount() {
//         axios.get('/movies', {
//             headers: {
//                 'x-auth':localStorage.getItem('token')
//             }
//         })
//             .then((response) => {
//                 console.log(response.data)
//                 this.setState(() =>({
//                     movies:response.data
//                 }))
//             })
//             .catch((err) => {
//             console.log(err)
//         })
//     }
//     render() {
//         return (
//             <div>
//                 <h2>listing movies-{this.state.movies.length}</h2>
//                 <ul>
//                     {this.state.movies.map((movie) => {
//                         return (<li key={movie._id}>
//                             <Link to={`/movies/${movie._id}`} >{movie.title}</Link>-{" "}{movie.director}
//                         </li>)
//                     })}
//                 </ul>
//                 <Link to='/movies/new'>Add Movie</Link>
//             </div>
//         )
//     }
// }
// export default ListMovies

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class ListMovies extends React.Component{
        constructor() {
             super() 
            this.state = {
                movies:[] 
            }
        }
        componentDidMount() {
            axios.get('/movies', {
                headers: {
                    'x-auth':localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response.data)
                    this.setState(() =>({
                        movies:response.data
                    }))
                })
                .catch((err) => {
                console.log(err)
            })
    }
    render(){
  const classes = this.props
  return (
    <React.Fragment>
      <CssBaseline />
     
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button color="primary">
                  <Link to='/movies/new'>Add Movie</Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {/* {console.log(this.state.movie)} */}
                      {this.state.movies.map((movie) => {
                      return  (<Grid item key={movie._id} xs={12} sm={6} md={4}>
                              <Card className={classes.card}>
                                  <img
                                    src={movie.image[0]}
                            height="150" width="275"
                          />
                                  <CardContent className={classes.cardContent}>
                                      <Typography >
                                        movie:{movie.title}
                                      </Typography>
                                      <Typography>
                                         director:{movie.director}
                            </Typography>
                            <Typography>
                                         description:{movie.description}
                            </Typography>
                            <Typography>
                                         year:{movie.year}
                                      </Typography>
                                  </CardContent>
                                  <CardActions>
                                      <Button size="small" color="primary">
                                      <Link to={`/movies/${movie._id}`} >view</Link>                    </Button>
                                      <Button size="small" color="primary">
                                      <Link to={`/movies/edit/${movie._id}`}>Edit</Link>
                    </Button>
                                  </CardActions>
                              </Card>
                          </Grid>)
                      })}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
}
export default ListMovies