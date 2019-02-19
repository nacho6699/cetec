//para cajas de comentarios
Template.comentarios.onRendered(function(){
	$('.collapsible').collapsible();
	$('input#input_text, textarea#textarea2').characterCounter();
});
	
Meteor.subscribe('publi_comentarios');
Template.comentarios.helpers({
	comentarios(){
		return Comentarios.find({idAr:this._id});
	},
	usuarios(){
		return Meteor.users.find({_id:this.idUs});
	}
});


Template.comentarios.events({
	'submit .form_comentar':function(e){
		e.preventDefault();
		var idAr=this._id;
		var texto=e.target.txt_comentar.value;
		
		if(texto.length>120){
			toastr.error("Inserta solo 120 caracteres");
		}else{
			var dato = {idAr:idAr, texto:texto};
			Meteor.call('insertarComentarios',dato);
			e.target.txt_comentar.value='';
			toastr.success("Exito");
		}
		
		
		//console.log(avatar);
	}
})
Template.comentarios.events({
	'click #btn_borrarComents':function(e){
		e.preventDefault();
		//alert
		swal({
		  title: '¿Estas seguro?',
		  text: "¡No podrás revertir esto!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#00695c',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, ¡eliminarlo!',
		  cancelButtonText:'Cancelar'
		}).then((result) => {
		  if (result.value) {
		  	Meteor.call('borrarComentarios',this._id);
		    swal(
		      '¡Eliminado!',
		      'El comentario fue eliminado.',
		      'success'
		    )
		  }
		})
		
 //var fechaExamen = moment("2015 05 20", "YYYY MM DD", "es");
 //console.log(fechaExamen.format("DD MMMM YYYY"));
		//console.log(this._id);
	}
})





