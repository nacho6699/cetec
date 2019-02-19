Meteor.publish('publi_articulos', function(){
	//console.log('estoy en el serverrr');
	//Meteor._sleepForMs(3000);
	return Articulos.find();

});
Meteor.publish('publi_comentarios', function(){
	return Comentarios.find();
});
//usuarios
Meteor.publish('publi_usuarios', function(){
	//console.log('estoy en el serverrr');
	return Meteor.users.find();

});

Meteor.methods({
	insertarPublicaciones: function(dato){
		if(!Meteor.userId()){
			throw new Meteor.Error('no-autorisado');
		}
		if(!dato){
			throw new Meteor.Error('no tiene datos');
			//console.log(dato.titulo);
		}

		Articulos.insert(dato);
	},
	borrarPublicaciones: function(dato){
		var loggedInUser = Meteor.user();
		//if (loggedInUser && Roles.userIsInRole(loggedInUser._id, ['administrador, adm_academico'],'admin')) {
		if (loggedInUser){
	      	Articulos.remove(dato);
			Comentarios.remove({idAr:dato});
			return true;
	    }else{
	    	throw new Meteor.Error(403, "Accesso denegado");
	    	return false;
	    }
			
		
	},
	insertarComentarios:function(dato){
		Comentarios.insert({idAr:dato.idAr, texto:dato.texto});
	},
	borrarComentarios: function(dato){
		Comentarios.remove({_id:dato});
	},
	habilitarComentario:function(dato){
		var articulo=Articulos.findOne({_id:dato});
		if(articulo.conComentario===true){
			Articulos.update({_id:dato},{$set:{
				conComentario:false
			}});
			return 'off';
		}else{
			Articulos.update({_id:dato},{$set:{
				conComentario:true
			}});
			return 'on';
		}
		
	}
});

//Publicacion.insert({titulo:"titulimanual", contenido:"mi contenido"});