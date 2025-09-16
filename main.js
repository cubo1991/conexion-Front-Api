import { getContacts,postContact, deleteContact,editContact,getContactosNombreOApellido, getContactoPorId } from "./peticiones.js";  // ✅ con extensión

const cerrarContactos = () => {
    let divContactos = document.getElementById('contactos');
    divContactos.innerHTML = "";
}

const mostrarContactos = async () => {
    let lista = await getContacts();
    let divContactos = document.getElementById('contactos');
    divContactos.innerHTML = "";


    let tabla = document.createElement('table');
    tabla.setAttribute('class', 'tabla-contactos');    
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ["ID", "Nombre", "Apellido", "Domicilio", "Email", "Teléfono", ""].forEach(texto => {
        let th = document.createElement('th');
        th.textContent = texto;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    let tbody = document.createElement('tbody');
    lista.forEach(contacto => {
        let tr = document.createElement('tr');  
        ["id","nombre","apellido","domicilio","email","telefono"].forEach(campo => {
            let td = document.createElement('td');
            td.textContent = contacto[campo];
            tr.appendChild(td);
        });

    
        let tdAcciones = document.createElement('td');
        let buttonEdit = document.createElement('button');
        buttonEdit.textContent = "Editar";
        buttonEdit.addEventListener('click', () => editarContacto(contacto.id));
        let buttonDelete = document.createElement('button');
        buttonDelete.textContent = "Eliminar";
        buttonDelete.addEventListener('click', () => eliminarContacto(contacto.id));
        tdAcciones.appendChild(buttonEdit);
        tdAcciones.appendChild(buttonDelete);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    divContactos.appendChild(tabla);
};


const editarContacto = async (id) => {

    let fila = Array.from(document.querySelectorAll('#contactos tbody tr'))
        .find(tr => tr.firstChild.textContent == id); 

 
    let nombre = prompt("Nuevo nombre:", fila.children[1].textContent);
    let apellido = prompt("Nuevo apellido:", fila.children[2].textContent);
    let domicilio = prompt("Nuevo domicilio:", fila.children[3].textContent);
    let email = prompt("Nuevo email:", fila.children[4].textContent);
    let telefono = prompt("Nuevo teléfono:", fila.children[5].textContent);

    let contactoActualizado = { nombre, apellido, email, telefono, domicilio };

    await editContact(id, contactoActualizado);
    cerrarContactos();
    alert("Contacto editado");
    mostrarContactos();
};


const eliminarContacto = async (id) => {
deleteContact(id);
cerrarContactos();
alert("Contacto eliminado");
mostrarContactos();


}

const buscarContactosNombreOApellido = async (e) => {
      e.preventDefault();
    let query = document.getElementById('buscarNombreApellido').value.toLowerCase();
    let resultados = await getContactosNombreOApellido(query);
    let warning = document.getElementById('warning-buscarNombreApellido');
    if(query === ""){
        warning.style.display = "block";
        warning.style.color = "red";
        warning.style.fontWeight = "bold";
        
        return;
    } else {
        warning.style.display = "none";
    }

   let divResultados = document.getElementById('resultados');
   divResultados.innerHTML = "";
   resultados.forEach(contacto => {
       let p = document.createElement('p');
       p.textContent = `${contacto.id} - ${contacto.nombre} - ${contacto.apellido} - ${contacto.domicilio} - ${contacto.email} - ${contacto.telefono}`;
       divResultados.appendChild(p);
   });
}

const buscarContactosPorId = async (e) => {
      e.preventDefault();
    let id = document.getElementById('buscarId').value;  
    let resultadosId = document.getElementById('resultadosId');
    resultadosId.innerHTML = "";
   
    let contacto = await getContactoPorId(id);
   if(contacto.error) {
    alert("Ha ocurrido un error")
   }
    let warning = document.getElementById('warning-buscarPorId');
    if(id === ""){
        warning.style.display = "block";
        warning.style.color = "red";
        warning.style.fontWeight = "bold";
 
        return;
     } else {
         warning.style.display = "none";
     }
    resultadosId.textContent = `${contacto.id} - ${contacto.nombre} - ${contacto.apellido} - ${contacto.domicilio} - ${contacto.email} - ${contacto.telefono}`;
}

const enviarForm = async (e) => {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let domicilio = document.getElementById('domicilio').value;
    let telefono = document.getElementById('telefono').value;
    let nuevoContacto = { nombre, apellido, email, domicilio, telefono };
    e.target.reset();
 console.log(nuevoContacto);
    await postContact(nuevoContacto);
    mostrarContactos();
    mostrarAgregar();
    
    
};

const mostrarAgregar = () => {
    let formulario = document.getElementById('formulario');
    let botonAgregar = document.getElementById('mostrarAgregar');
    if(formulario.style.display === 'block'){
        formulario.setAttribute('style', 'display:none;');
        botonAgregar.textContent = "Agregar Contacto";

        return;
    }else {
        formulario.setAttribute('style', 'display:block;');
        botonAgregar.textContent = "Cancelar";
  
    }
}




const inicializarEventos = () => {
    let botonCargar = document.getElementById('mostrar');
    let botonAgregar = document.getElementById('mostrarAgregar');
    let formulario = document.getElementById("formulario");
    let inputBuscarNombreApellido = document.getElementById("formBuscarNombreApellido");
    let inputBuscarporId = document.getElementById("formBuscarPorId");

    inputBuscarNombreApellido.addEventListener('submit', buscarContactosNombreOApellido);
    inputBuscarporId.addEventListener('submit', buscarContactosPorId);
    botonCargar.addEventListener('click', mostrarContactos);
    botonAgregar.addEventListener('click', mostrarAgregar);
    formulario.addEventListener('submit', enviarForm);

 
};
inicializarEventos();

