import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './articulos.html';

Meteor.subscribe('publi_usuarios');
Meteor.subscribe('publi_comentarios');

Template.articulos.onRendered(function(){

  $(function(){
      $('.collapsible').collapsible();

  })
});


Template.articulos.helpers({
  usuarios: function(){
    return Meteor.users.find();

  },
  ready: function(){
  	
  	return FlowRouter.subsReady("getArticulos");
  	//console.log('se qeda aqui');
  },
  arti: function() {
    return Articulos.find().fetch().reverse();
  },
  cantidadComents() {
      return Comentarios.find({idAr: this._id}).count();
  }
});

Template.articulos.events({
	'click #btn_borrar':function(e){
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
        Meteor.call('borrarPublicaciones', this._id, function(error,result){
        if(error){
                  alert(error.reason); 
                  swal(
            'Oops...',
            'Error acción no realizada',
            'error'
          )
        }else if(result){
            swal({
              type: 'success',
              title: 'Se borro exitosamente',
              showConfirmButton: false,
              timer: 2000
            });
        }else{
            swal({
            //position: 'top-end',
              type: 'info',
              title: 'Usuario no autorizado',
              showConfirmButton: false,
              timer: 2000
            });
        }
                
    });
      }
    })    
  },
  'click #btn_habilitarComentario':function(e){
      e.preventDefault();
      var idA=this._id;
      Meteor.call('habilitarComentario', this._id, function(error,result){
        if(error){
            alert(error.reason); 
            swal(
            'Oops...',
            'Error de acción',
            'error'
          )
        }else if(result){
            swal({
              type: 'success',
              title: 'Actualización correcta',
              showConfirmButton: false,
              timer: 1500
            });
          if(result==='on'){
            $('.'+idA).text('speaker_notes');
          }else{
            $('.'+idA).text('speaker_notes_off');
          } 
        }else{
            swal({
              type: 'info',
              title: 'Usuario no autorizado',
              showConfirmButton: false,
              timer: 2000
            });
        }
                
      });
  }
})
