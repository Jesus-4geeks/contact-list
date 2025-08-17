import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { postAgendaSlug, getAllContacts, postContact, editContact } from "../store";
import { ErrorMsg } from "../components/ErrorMsg.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchParams } from "react-router-dom";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        name: searchParams.get('name') || '',
        email: searchParams.get('email') || '',
        phone: searchParams.get('phone') || '',
        address: searchParams.get('address') || ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

    const handlePostContact = async (new_contact) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const response = await postContact(new_contact);

            if (response.id) {
                dispatch({ type: "ADD_CONTACT", payload: new_contact });
                return await handleGetContacts();
            }
            throw new Error("There was a problem adding the contact");
            
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };
    
    const handleEditContact = async (contact, contact_id) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const response = await editContact(contact, contact_id);
            
            if (response.id) {
                dispatch({ type: "UPDATE_CONTACT", payload: {...contact, id: contact_id} });
                return await handleGetContacts();
            }
            console.error(response);
            throw new Error("There was a problem updating the contact");
            
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };
    
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Add a new contact</h1>

            {/* Error Alert */}
            {store.error && (
                <>
                    <ErrorMsg msg={store.error} />
                    <ScrollToTop />
                </>
            )}

            {/* Form */}
            <form className="mb-4">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="fullName"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
            </form>

            {/* Send Data */}
            <button
                className="btn btn-primary w-100 mb-3"
                onClick={() => {
                    searchParams.get('name') ? handleEditContact(formData, searchParams.get('id')) : handlePostContact(formData);
                    navigate('/');
                }}
            >
                Save
            </button>
            
            {/* Go to /home */}
            <span className="d-flex mb-3">
                <Link to="/" className="btn btn-info">Volver a Home</Link>
            </span>
        </div>
    );
};