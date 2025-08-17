import { randomImgLink } from "../store.js"

export const ContactCard = ({ contact, handleUpdateContact, handleDeleteContact }) => {
    return (
        <div className="contact border-bottom">
            {/* Foto de perfil */}
            <img className="contact-img" src={randomImgLink}/>

            {/* Datos de contacto */}
            <span className="contact-info">
                <p className="contact-name">{contact.name}</p>
                <p className="text-secondary">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {contact.address}
                </p>
                <p className="text-secondary">
                    <i className="fa-solid fa-phone me-2"></i>
                    {contact.phone}
                </p>
                <p className="text-secondary">
                    <i className="fa-solid fa-envelope me-2"></i>
                    {contact.email}
                </p>
            </span>

            {/* Botones Editar y Eliminar */}
            <button className="btn btn-warning me-2" onClick={handleUpdateContact}>
                <i className="fa-solid fa-pen-to-square me-2"></i>
                Edit
            </button>
            <button className="btn btn-danger" onClick={handleDeleteContact}>
                <i className="fa-solid fa-trash me-2"></i>
                Delete
            </button>
        </div>
    );
};