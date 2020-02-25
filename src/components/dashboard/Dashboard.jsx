import React, { Component } from 'react'
import ContactList from './contacts/ContactList'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <ContactList />    
            </div>
        )
    }
}
