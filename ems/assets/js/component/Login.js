import React, { Component } from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';

class Form_connexion extends React.Component {
    constructor(props) {
       
        super(props);
        this.state = {
            values: {
                email: "",
                password: ""
              },

        };
        
    }
    
    handleForm  (e) {
        this.setState({
            values: { ...this.state.values, [e.target.name]: e.target.value }
          });
        
          
    }
		
    
     
    submitForm(e) {
		e.preventDefault();
		axios.post(
			'http://localhost:8000/api/login',
			JSON.stringify(this.state.values),
			{ headers: {"Content-Type": "application/json"} }
		).then((response) => {
			console.log(response);
			this.setState({
				isExpenseAdded: false,
			})
		  }, (error) => {
			console.log(error);
		  });
	};
    
    render () {
		return (
			<form onSubmit={this.submitForm.bind(this)}>
        		<label htmlFor="email">Email</label>
        		<input type="text" name="email" value={this.state.values.email} onChange={this.handleForm.bind(this)} />
        
        		<label htmlFor="password">Mot de passe</label>
        		<input type="password" name="password"  value={this.state.values.password} onChange={this.handleForm.bind(this)} />

                <button type='submit'>Connexion</button>
      		</form>
    	);
    }
}

export default Form_connexion;