import React, { Component } from 'react'
import axios from 'axios'
import './customers.css'

class Customers extends Component {
    state = {
        customers: []
    }

    componentDidMount() {
        axios
            .get('api/customers')
            .then(res => {
                let customers = res.data
                this.setState({customers})
            })
    }

    render() {
        return (
            <div>
                <h2>Customers</h2>
                <ul>
                    {this.state.customers.map(customer =>
                        <li key={customer.id}>{customer.firstName} {customer.lastName} </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Customers
