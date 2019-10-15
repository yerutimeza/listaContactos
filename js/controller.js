
//Objeto  de acceso a datos  
const persistence = new Persistence();
let esNuevo = true;
let indice = -1;

/* MENU*/
$("ul li a").click(function(){
    if( !$(this).hasClass('active') ){

    $("ul li a").toggleClass('active');
    $("#registros").toggle();
    $('#formulario').toggle();

    }
  
});
/*FORMULARIO*/
//Guardar
$("form").submit( function( evento ){
	evento.preventDefault();
	console.log("submit en el formulario")
     let persona = {
     	nombre: $("#nombre").val(),
     	telefono: $("#telefono").val(),
     	email:  $("#email").val(),
     	direccion:  $("#direccion").val()
     };
     if( esNuevo ){
     	persistence.guardar( persona );
     }else {
     	persistence.modificar(persona, indice);
     }

      



     


      //limpia el formulario
     $('#btnCancelar').click();
     //carga de nuevo toda la tabla 
     cargarTabla();

} );
//mdifica el valor de esNuevo a true
$('#btnCancelar').click(function(event) {
	esNuevo = true;

});

function editar( btn ){
	esNuevo = false;
    indice = $(btn).parent().parent().index();
	let contacto = persistence.recuperarPorIndice( indice );

	$( "#nombre" ).val( contacto.nombre );
	$( "#telefono" ).val( contacto.telefono );
	$( "#email" ).val( contacto.email );
	$( "#direccion" ).val( contacto.direccion );

	$("#reg").click();

}

function eliminar(btn){
	indice = $(btn).parent().parent().index();
	persistence.eliminar(indice);
	cargarTabla();

}








/*TABLA*/
//Cargar dato
//Carga todos los datos que hay en el localStorage
//recorriendo el array que es recuperar por medio del 
//metodo persistence.recuperarTodos()
function cargarTabla(){
     //Elimina todos los items de la tabla, para volver a cargar 

	//console.log($('#tbContactos tbody').html());
	$('#tbContactos tbody').html("");
	//recupera todo los datos en formato de array de objetos
	persistence.recuperarTodos().forEach( function( elem, key ){
        
        let tmp = `<tr>
                                <th scope="row">${ key }</th>
                                <td>${ elem.nombre }</td>
                                <td>${ elem.telefono }</td>
                                <td>${elem.email}</td>
                                <td>${elem.direccion}</td>
                                <td>
                                    <button onclick="editar(this)" class="bnt
                                     btn-outline-warning btn-sm"
                                      data-toggle="tooltip"
                                       data-placement="top"
                                        title="Editar">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="eliminar(this)" class="bnt
                                     btn-outline-danger btn-sm"
                                      data-toggle="tooltip" data-placement="top"
                                       title="Eliminar">
                                        <i class="fas fa-eraser"></i>
                                    </button>
                                </td>
                            </tr>`;
                            //Agrega cada items recuperado del localStorage 
                            //al final de la tabla
                   $('#tbContactos tbody').append( tmp );



	});

}

cargarTabla();