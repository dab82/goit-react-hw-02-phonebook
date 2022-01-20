import { Component } from "react";
import { Formik, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../Buttons/Button";
import { AddForm, Input, Message, LabelForm } from "./ContactFormStyle";
import propTypes from "prop-types";

const initialValues = {
	name: "",
	number: "",
};

const FormError = ({ name }) => {
	return (
		<ErrorMessage
			name={name}
			render={(message) => <Message>{message}</Message>}
		/>
	);
};

export class ContactForm extends Component {
	handleSubmit = ({ name, number }, { resetForm }) => {
		const nameInContacts = this.props.contacts.find(
			(contact) => contact.name.toLowerCase() === name.toLowerCase()
		);
		if (nameInContacts) {
			toast.warn(`${name} is already in contacts`);
			return;
		}
		const contact = { id: nanoid(), name, number };
		this.props.onSubmit(contact);
		resetForm();
	};

	render() {
		return (
			<Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
				<AddForm autoComplete="off">
					<div>
						<LabelForm htmlFor="name">Name</LabelForm>
						<div>
							<Input
								type="text"
								name="name"
								pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
								title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
								required
							/>
							<FormError name="name" />
						</div>
					</div>
					<div>
						<LabelForm htmlFor="number">Number</LabelForm>
						<div>
							<Input
								type="tel"
								name="number"
								pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
								title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
								required
							/>
							<FormError name="number" />
						</div>
					</div>
					<Button type="submit" text={"Add contact"} />
				</AddForm>
			</Formik>
		);
	}
}

ContactForm.propTypes = {
	onSubmit: propTypes.func.isRequired,
	contacts: propTypes.arrayOf(propTypes.object).isRequired,
};
