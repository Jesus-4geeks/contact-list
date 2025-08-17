import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { postAgendaSlug, getAllContacts, deleteContact } from "../store.js";
import { ContactCard } from "../components/ContactCard.jsx"
import { Link } from "react-router-dom";
import { ErrorMsg } from "../components/ErrorMsg.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	
	const handleGetContacts = async () => {
		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			const response = await getAllContacts();
	
			if (response.contacts) {
				return dispatch({ type: 'SET_CONTACTS', payload: response.contacts });
			}
			else if (response.status === 404) {
				await postAgendaSlug();
				return await handleGetContacts();
			}
			throw new Error(JSON.stringify(response));
	
		} catch (error) {
			dispatch({ type: 'SET_ERROR', payload: error.message });
		}
	};

	const handleUpdateContact = (contact) => {
		navigate(`/contact?` +
			`name=${contact.name}&` +
			`email=${contact.email}&` +
			`phone=${contact.phone}&` +
			`address=${contact.address}&` +
			`id=${contact.id}`
		);
	};

	const handleDeleteContact = async (contact_id) => {
		/* dispatch({ type: 'SET_LOADING', payload: true }); */
		try {
			const response = await deleteContact(contact_id);

			if (response.ok) {
				dispatch({ type: 'DELETE_CONTACT', payload: { id: contact_id } });
				return await handleGetContacts();
			}
			console.error(response);
			throw new Error(`There was a problem deleting the contact with id: ${contact_id} -> ${response}`);

		} catch (error) {
			dispatch({ type: 'SET_ERROR', payload: error.message });
		}
	};

	useEffect(() => {
		handleGetContacts();
	}, []);

	return (
		<div className="container mt-5">
			<h1 className="text-center mb-5">Contact List</h1>

			{/* Error Alert */}
			{(store.error) && (
				<>
					<ErrorMsg msg={store.error} />
					<ScrollToTop />
				</>
			)}

			{/* Go to /contact */}
			<span className="d-flex mb-3">
				<Link to="/contact" className="btn btn-success ms-auto">Add new contact</Link>
			</span>

			{/* Contact List */}
			<div className="border rounded-1">
				{store.loading ? (
					<h2>Loading...</h2>
				) : store.contacts.map((contact, index) => (
						<ContactCard
							key={index}
							contact={contact}
							handleUpdateContact={() => handleUpdateContact(contact)}
							handleDeleteContact={() => handleDeleteContact(contact.id)}
						/>
					))}
			</div>
		</div>
	);
};