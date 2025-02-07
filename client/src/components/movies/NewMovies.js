import React from 'react'
import FormMovie from './FormMovies'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';

class NewMovie extends React.Component{
    constructor() {
        super()
        this.handleMovieSubmission=this.handleMovieSubmission.bind(this)
}
    handleMovieSubmission(data) {
         console.log(data,"handlemovie") 
        console.log(this)
        axios.post('/movies', data, {
            headers: {
            'x-auth':localStorage.getItem('token')
            }
        })
            .then((response) => {
                const movie = response.data
               console.log(response.data,1)
                this.props.history.push(`/movies/`)
            })
            .catch((err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <FormMovie handleMovieSubmission={this.handleMovieSubmission}/>
            </div>
        )
    }  
}
export default NewMovie