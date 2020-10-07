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
		
    
    
    submitForm(e)  {
        e.preventDefault();
        this.setState({ isSubmitting: true });
        
        
        fetch("", {
            method: "POST",
            body: JSON.stringify(this.state.values),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resolve)=>{return resolve.json()}).catch((error)=>{ return alert('toto')})
        
        this.setState({ isSubmitting: false });
        
      
        
        setTimeout(
            () =>
                this.setState({
                    isError: false,
                    message: "",
                    values: { email: "", password: "" }
                }),
              1600
            );
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