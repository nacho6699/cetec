Template.text_editor.onRendered(function(){
	$('#txtedit').Editor();
	$('#msg_error').hide();
});
//error = new ReactiveVar();
//error.set(" ");
// editando y creando mis articulos
Template.text_editor.events({
	'submit #for_editor':function(e){
		e.preventDefault();
		var titulo=e.target.txt_titulo.value;
		var contenido=$("#txtedit").Editor('getText');
		var conComentario=e.target.chek_modulo1.checked;
		var dato = {titulo:titulo, contenido:contenido,conComentario:conComentario};

		//$(".cargar").html(texto);
		Meteor.call('insertarPublicaciones',dato, function(err){
			//mensaje si los campos no estan completos
			if(err){
				toastr.error("Error de Publicación");
				$('#msg_error').text('');
				$('#msg_error').append('<strong>Error!</strong>Debe llenar todos los campos');
				$('#msg_error').show( 300 ).delay( 5000 ).hide( 400 );
			}else{
				toastr.success('Nueva Publicación!!!');
			}
		});

		$("#txtedit").Editor('setText','');
		$("#txt_titulo").val('');
		//console.log(">>>"+contenido+titulo);
		
		// if(!dato.nombre==""){
			//Meteor.call('insertarUsuarios',dato);
			
		//}else{
			//alert("debe llenar todos los campos");
		//}

		//alert(titulo);
		//e.target.reset();
	}

});
