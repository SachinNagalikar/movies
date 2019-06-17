import React from 'react'
import axios from '../../config/axios'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedToken: localStorage.getItem('token')
        }
    }
    componentDidMount() {
        console.log('logout')
        axios.delete('/users/logout', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response)
                localStorage.removeItem('token')
                this.props.history.push('/users/login')
                this.props.handlelogout()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default (Logout)