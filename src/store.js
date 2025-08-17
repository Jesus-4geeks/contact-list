/* Initial Values */
const mySlug = 'jesus-4geeks-slug'
const apiLink = `https://playground.4geeks.com/contact/agendas/${mySlug}`
export const randomImgLink = 'https://picsum.photos/200'

export const initialStore = () => {
    return {
        contacts: [],
        /* [
            {
                name: "Josefo J.",
                phone: "722 653 214",
                email: "josefino@gmail.com",
                address: "C/ Una calle, 7",
            },
            {
                name: "Alexander K.",
                phone: "652 134 978",
                email: "alexander@gmail.com",
                address: "C/ Una calle x2, 8",
            },
            {
                name: "Anastasia V.",
                phone: "694 512 689",
                email: "anastasia@gmail.com",
                address: "C/ Una calle x3, 9",
            },
        ], */
        loading: false,
        error: null
    }
}

/* Metodos CRUD */
export const postAgendaSlug = async () => {
    const response = await fetch(`${apiLink}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mySlug)
    });
    return await response.json();
}


export const deleteAgendaSlug = async () => {
    const response = await fetch(`${apiLink}`, {
        method: 'DELETE'
    });
    return await response.json();
}


export const getAllContacts = async () => {
    const response = await fetch(`${apiLink}/contacts`);
    return await response.json();
}


export const postContact = async (contact) => {
    const response = await fetch(`${apiLink}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
    return await response.json();
}


export const editContact = async (contact, contact_id) => {
    const response = await fetch(`${apiLink}/contacts/${contact_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
    return await response.json();
}


export const deleteContact = async (contact_id) => {
    const response = await fetch(`${apiLink}/contacts/${contact_id}`, {
        method: 'DELETE'
    });
    return response;
}


/* Reducer Function */
export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...store,
                loading: action.payload
            };
            
        case 'SET_ERROR':
            return {
                ...store,
                loading: false,
                error: action.payload
            };

        case 'SET_CONTACTS':
            return {
                ...store,
                contacts: action.payload,
                loading: false,
                error: null
            };

        case 'ADD_CONTACT':
            return {
                ...store,
                contacts: [...store.contacts, action.payload],
                loading: false,
                error: null
            };

        case 'UPDATE_CONTACT':
            return {
                ...store,
                contacts: store.contacts.map(contact => 
                    contact.id === action.payload.id ? action.payload : contact
                ),
                loading: false,
                error: null
            };

        case 'DELETE_CONTACT':
            return {
                ...store,
                contacts: store.contacts.filter(contact => 
                    contact.id !== action.payload.id
                ),
                loading: false,
                error: null
            };

        default:
            throw new Error('Unknown action.');
    }
}
