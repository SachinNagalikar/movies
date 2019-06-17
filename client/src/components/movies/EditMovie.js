import React from 'react'
import FormMovie from './FormMovies';
import Genere from '../genere/Genere' 
import axios from '../../config/axios';
class EditMovie extends React.Component {
    constructor() {
        super()
        this.state = {
            movie: {},
            genere:[],
            isloaded: false
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        console.log(id)
        axios.get(`/movies/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response)=> {
                    console.log(response.data, 1)
                    const movie = response.data
                    this.setState(() => ({
                        movie,
                        isloaded: true
                    }))
                })
            .catch((err) => {
                console.log(err)
            })
    }
    handleMovieSubmission = (formData) => {
       console.log(formData,"handlemovie")
        axios.put(`/movies/${this.state.movie._id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response) => {
                const movie = response.data
                this.props.history.push(`/movies/${movie._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return ( < div >
            {/* <h2 > Edit Movie </h2> */}

            {
                this.state.isloaded &&
                    <FormMovie title = {
                        this.state.movie.title
                    }
                director = {
                    this.state.movie.director
                }
                genere = {
                    this.state.movie.genere
                    }
                    description={
                        this.state.movie.description
                    }
                    year={
                        this.state.movie.year
                    }
                handleMovieSubmission = {
                    this.handleMovieSubmission
                }
                />
            } </div>
        )
    }
}
export default EditMovie