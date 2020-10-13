import React, { Component } from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Form_add_ems extends React.Component {
    constructor(props) {
       
        super(props);
        this.state = {
            isExpenseAdded: false,
            values: {
                email: "",
                password: "",
                lastname: "",
                firstname: "",
                price: "",
                content: "",
                selectedFile: null


              },

        };
        
    }
    
    handleForm  (e) {
        this.setState({
            values: { ...this.state.values, [e.target.name]: e.target.value }
          });
        
          
    }

    onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
		
    
    
      submitForm(e) {
		e.preventDefault();
		axios.post(
			'http://localhost:8000/api/expense/new',
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
        let {isExpenseAdded} = this.state;
		const renderPopup = () => {
			if(isExpenseAdded){		
				$('#expenseAddedModal').modal('toggle');
			}
		}
		return (
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <label htmlFor="lastname">Nom</label>
                    <input type='text' name='lastname' value={this.state.values.lastname} onChange={this.handleForm.bind(this)} required />

                    <label htmlFor='firstname'>Prénom</label>
                    <input type='text' name='firstname' value={this.state.values.firstname} onChange={this.handleForm.bind(this)} required />

        		    <label htmlFor="email">Email</label>
        		    <input type="text" name="email" value={this.state.values.email} onChange={this.handleForm.bind(this)} required/>
        
        		    <label htmlFor="file">Ajoutez Note de Frais</label>
                    <input type="file" name="file"  onChange={this.onChangeHandler}  accept="image/png, image/jpeg" required/>

                    <label htmlFor="price">Prix</label>
                    <input type="text" name="price" value={this.state.values.price}  onChange={this.onChangeHandler} required />

                    <label htmlFor="content">commentaire</label>
                    <input type="text" name="content" value={this.state.values.content}   onChange={this.onChangeHandler}  />

                    <div className="modal fade" id="userAddedModal" role="dialog" aria-labelledby="userAddedModal" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">La note de frais à bien été envoyé</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<p>Vous recevrez une notification dès que votre note de frais sera traités.<br/></p>
								<span>{this.state.values.email}</span>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">Continuer</button>
							</div>
							</div>
						</div>
					</div>

                    <button type='submit'>Ajouter une nouvelle note de frais</button>
      		    </form>
                {renderPopup()}
            </div>
			
        
    	);
    }
}

export default Form_add_ems;