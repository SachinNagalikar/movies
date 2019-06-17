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

// import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'
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

const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

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