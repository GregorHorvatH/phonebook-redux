import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PhonebookEditor.module.css';
import * as actions from '../../redux/phoneBook/phoneBookActions';
import shortid from 'shortid';
import toastr from 'toastr';
toastr.options = {
	closeButton: false,
	debug: false,
	newestOnTop: false,
	progressBar: false,
	positionClass: 'toast-top-right',
	preventDuplicates: false,
	onclick: null,
	showDuration: '300',
	hideDuration: '1000',
	timeOut: '5000',
	extendedTimeOut: '1000',
	showEasing: 'swing',
	hideEasing: 'linear',
	showMethod: 'fadeIn',
	hideMethod: 'fadeOut',
};

const InputForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const isExists = useSelector(
		state =>
			!!state.phoneBookReducer.contacts.items.find(
				contact => contact.name === name
			)
	);

	const handleSubmit = e => {
		e.preventDefault();
		if (isExists) {
			toastr.warning(`Contact ${name} is already exists`);
			return;
		}

		dispatch(
			actions.contactAdd({
				id: shortid.generate(),
				name,
				number,
			})
		);
		setName('');
		setNumber('');
	};
	return (
		<div>
			<form className={styles.PhonebookEditor} onSubmit={handleSubmit}>
				<h2>Name</h2>
				<input
					type='text'
					name='name'
					value={name}
					onChange={e => setName(e.target.value)}
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
					required
				/>
				<h2>Number</h2>
				<input
					type='tel'
					name='number'
					value={number}
					onChange={e => setNumber(e.target.value)}
					pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
					title='Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +'
					required
				/>

				<button className={styles.PhonebookEditorButton} type='submit'>
					Add contact
				</button>
			</form>
		</div>
	);
};

export default InputForm;