// import React from 'react'
// import {Link} from 'react-router-dom'
// import axios from '../../config/axios';

// class ShowMovie extends React.Component{
//     constructor(props) {
//         super(props)
//         this.state = {
//             movie:{} 
//         }
//         this.handleDelete=this.handleDelete.bind(this)
//     }
//     componentDidMount() {
//         const id = this.props.match.params.id
//         console.log(id,'idjdj')
//         axios.get(`/movies/${id}`, {
//             headers: {
//                 'x-auth':localStorage.getItem('token')
//             }
//         })
//             .then((response) => {
//                 const movie = response.data
//                 this.setState(()=>({movie:response.data}))
//             })
//             .catch((err) => {
//             console.log(err)
//         })
//     }
//     handleDelete() {
//         const confirmDelete = window.confirm('are you sure')
//         if (confirmDelete) {
//             axios.delete(`/movies/${this.state.movie._id}`, {
//                 headers: {
//                     'x-auth':localStorage.getItem('token')
//                 }
//             })
//                 .then((response) => {
//                     const movie = response.data        
//                 this.props.history.push(movie)
//                 })
//                 .catch((err) => {
//                 console.log(err)
//             })
//         }
//     }
//     render() {
//         return (
//             <div>
//                 {console.log(this.state.movie,"oiugytfytdfg")}
//                 <h2>{this.state.movie.name}</h2>
//                 <p>{this.state.movie.director}-{this.state.movie.title}</p>
//                 <Link to={`/movies/edit/${this.state.movie._id}`}>Edit</Link>
//                 <button onClick={this.handleDelete}>delete</button>
//                 <Link to="/movies">Back</Link>
//             </div>
//         )
//     }
// }
// export default ShowMovie


import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {CardImg} from 'reactstrap'
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

const cards = [1];

class ShowMovie extends React.Component{
        constructor(props) {
            super(props)
            this.state = {
              movie: {},
              isloaded:false
            }
            this.handleDelete=this.handleDelete.bind(this)
        }
        componentDidMount() {
            const id = this.props.match.params.id
            console.log(id,'idjdj')
            axios.get(`/movies/${id}`, {
                headers: {
                    'x-auth':localStorage.getItem('token')
                }
            })
                .then((response) => {
                  const movie = response.data
                  console.log(movie)
                    this.setState(()=>({movie:response.data}))
                })
                .catch((err) => {
                console.log(err)
            })
        }
        handleDelete() {
            const confirmDelete = window.confirm('are you sure')
            if (confirmDelete) {
                axios.delete(`/movies/${this.state.movie._id}`, {
                    headers: {
                        'x-auth':localStorage.getItem('token')
                    }
                })
                    .then((response) => {
                        const movie = response.data        
                    this.props.history.push(`/movies`)
                    })
                    .catch((err) => {
                    console.log(err)
                })
            }
        }
    render(){
  const classes = this.props
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
                    <Grid item key={this.state.movie._id} xs={12} sm={6} md={4}>
              {this.state.movie._id && <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <img
                    src={this.state.movie.image[0]}
                    height="150" width="275"
                  />
                  <Typography  >
                    {console.log(this.state.movie)}
                    movie :{this.state.movie.title}
                  </Typography>
                  <Typography>
                    director : {this.state.movie.director}
                  </Typography>
                  <Typography>
                    description : {this.state.movie.description}
                  </Typography>
                  <Typography>
                    year : {this.state.movie.year}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={this.handleDelete}>
                    delete</Button>
                  <Button size="small" color="primary">
                    <Link to="/movies">Back</Link>
                  </Button>
                </CardActions>
              </Card>}
                          </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
}
export default ShowMovie