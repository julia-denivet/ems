import React, { Component } from 'react';
import axios from 'axios';

class NewUser extends Component {
	constructor(props) {
        super(props);
        this.state = {
			isUserAdded: false,
            values: {
                email: "",
				lastName: "",
				firstName: "",
				department: ""
            },
        };
	}
	
	handleForm(e) {
        this.setState({
            values: { ...this.state.values, [e.target.name]: e.target.value }
        });   
	}
	
	submitForm(e) {
		e.preventDefault();
		axios.post(
			'http://localhost:8000/api/user/new',
			JSON.stringify(this.state.values),
			{ headers: {"Content-Type": "application/json"} }
		).then((response) => {
			console.log(response);
			this.setState({
				isUserAdded: true
			})
		  }, (error) => {
			console.log(error);
		  });
	};

	render() {
		let {isUserAdded} = this.state;
		const renderPopup = () => {
			if(isUserAdded){		
				$('#userAddedModal').modal('toggle');
			}
		}
		return(
			<div className="container">
				<form onSubmit={this.submitForm.bind(this)}>

					<div className="form-group">
                    	<input className="form-control" type="email" name="email" placeholder="Email" value={this.state.values.email} onChange={this.handleForm.bind(this)} required />
					</div>
            
					<div className="form-row form-group">
						<div className="col">
							<input className="form-control" type="text" name="lastName" placeholder="Nom" value={this.state.values.lastName} onChange={this.handleForm.bind(this)} required />
						</div>
						<div className="col">
							<input className="form-control" type="text" name="firstName" placeholder="Prénom" value={this.state.values.firstName} onChange={this.handleForm.bind(this)} required />
						</div>
					</div>

					<div className="form-group">
						<select name="department" className="form-control" value={this.state.values.department} onChange={this.handleForm.bind(this)} required >
							<option value="" disabled>Service</option>
							<option value="marketing">Marketing</option>
							<option value="technical">Technique</option>
						</select>
					</div>

					<div className="modal fade" id="userAddedModal" role="dialog" aria-labelledby="userAddedModal" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">L'utilisateur à été ajouté</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<p>Un mail contenant les informations de connexion à été envoyé à l'addresse mail suivante:<br/></p>
								<span>{this.state.values.email}</span>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">Continuer</button>
							</div>
							</div>
						</div>
					</div>

					<button className="btn btn-primary" type="submit">Ajouter l'utilisateur</button>
      		    </form>
				  {renderPopup()}
			</div>
		)
	}
}

export default NewUser;