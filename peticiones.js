import { url } from "./constantes.js";  
let contactos = [];
const getContacts = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    contactos = data;
  
return contactos;
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

const postContact = async (contact) => {
    console.log("Posting contact:", contact);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(contact)
    });
console.log("Response status:", response.status);

  } catch (error) {
    console.error("Error posting contact:", error);
  }
}

const deleteContact = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    console.log("Response status:", response.status);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};

const editContact = async (id, updatedContact) => {
  try {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
    });
    console.log("Response status:", response.status);
  } catch (error) {
    console.error("Error editing contact:", error);
  }
};

const getContactosNombreOApellido = async (query) => {

    try {
        const response = await fetch(`${url}/buscar?texto=${query}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
};

const getContactoPorId = async (id) => {

    try {
        const response = await fetch(`${url}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching contact:", error);
    }
};

export { getContacts, postContact, deleteContact, editContact, getContactosNombreOApellido, getContactoPorId };
