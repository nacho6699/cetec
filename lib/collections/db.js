import {} from 'meteor/mongo';

Articulos = new Mongo.Collection('articulos');
Comentarios = new Mongo.Collection('comentarios');
Carreras = new Mongo.Collection('carreras');
Modulos = new Mongo.Collection('modulos');
Materias = new Mongo.Collection('materias');
Gestiones = new Mongo.Collection('gestiones');
Grupos = new Mongo.Collection('grupos');
Matriculas = new Mongo.Collection('matriculas');
Designaciones = new Mongo.Collection('designacoines');
Notas = new Mongo.Collection('notas');
KardexEstudiante = new Mongo.Collection('kardexEstudiante');
//articulos
var artiSchema = new SimpleSchema({
	titulo:{
		type:String
	},
	contenido:{
		type:String
	},
	fechaPublicacion:{
		type:String,
		autoValue:function(){
			moment().locale('es');
		    var fecha = moment().format('lll');
		    return fecha;
		}
	},
	conComentario:{
		type:Boolean
	},
	owner:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
});
Articulos.attachSchema(artiSchema);

var comentSchema = new SimpleSchema({
	idUs:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	idAr:{
		type:String
	},
	texto:{
		type:String
	},
	fechaComentario:{
		type:String,
		autoValue:function(){
			moment().locale('es');
		    var fecha = moment().format('LLL');
		    return fecha;
		}
	},	
	fechaCreacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}		
});
Comentarios.attachSchema(comentSchema);
//carreras
var carreraSchema = new SimpleSchema({
	id_gestion:{
		type:[String]
	},
	nombreCarrera:{
		type:String,
		max:50
	},
	numero_modulos:{
		type:Number,
		max:30
	},
	numero_estudiantes:{
		type:Number,
		max:30
	},
	limite:{
		type:Number,
		max:30,
		optional:true,
		defaultValue:0
	},
	idUs:{
		type:String,
		autoValue:function(){
			if (this.isInsert){
		        return Meteor.userId();
		    }else {
		        this.unset();  // evitar que el usuario modifique
		    }
				//return Meteor.userId();
		}
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
})
Carreras.attachSchema(carreraSchema);
//Modulos
var modulosSchema = new SimpleSchema({
	id_gestion:{
		type:[String]
	},
	id_carrera:{
		type:String
	},
	nombreModulo:{
		type:String
	},
	nombreMateria:{
		type:String
	},
	sigla:{
		type:String
	},
	fechaInicio:{
		type:Date
	},
	fechaFin:{
		type:Date
	},
	ano:{
		type:String
	},
	idUs:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
})
Modulos.attachSchema(modulosSchema);
//materias
var materiasSchema = new SimpleSchema({

	idUs:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	id_carrera:{
		type:String
	},
	nombreMateria:{
		type:String
	},
	sigla:{
		type:String
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
})
Materias.attachSchema(materiasSchema);
//gestiones
var gestionesSchema = new SimpleSchema({
	idUs:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	gestion:{
		type:Number
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
})
Gestiones.attachSchema(gestionesSchema);
//Grupos
var gruposSchema = new SimpleSchema({
	id_carrera:{
		type:String
	},
	nombreGrupo:{
		type:String
	},
	turno:{
		type:String
	},
	horaInicio:{
		type:String
	},
	horaFin:{
		type:String
	},
	idUs:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
})
Grupos.attachSchema(gruposSchema);
//Matriculas----------------------------------------------------
var matriculasSchema = new SimpleSchema({
	idUs:{
		type:String
	},
	id_modulos:{
		type:String
	},
	id_carrera:{
		type:String
	},
	id_grupo:{
		type:String
	},
	id_gestion:{
		type:String
	},
	inicio:{
		type:Date
	},
	fin:{
		type:Date
	},
	owner:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
});
Matriculas.attachSchema(matriculasSchema);
//Designaciones
var designacionesSchema = new SimpleSchema({
	idUs:{
		type:String
	},
	id_modulos:{
		type:String
	},
	id_grupo:{
		type:String
	},
	turno:{
		type:String
	},
	id_gestion:{
		type:String
	},
	finaliza:{
		type:Date
	},
	empiesa:{
		type:Date
	},
	owner:{
		type:String,
		autoValue:function(){
				return Meteor.userId();
		}
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
});
Designaciones.attachSchema(designacionesSchema);


//notas
var notasSchema = new SimpleSchema({
	idUs:{
		type:String
	},
	owner:{
		type:String
	},
	id_modulo:{
		type:String
	},
	id_grupo:{
		type:String
	},
	id_gestion:{
		type:String
	},
	primerP:{
		type:Number,
		decimal:true,
	},
	segundoP:{
		type:Number,
		decimal:true
	},
	promP:{
		type:Number,
		decimal:true
	},
	asistencia:{
		type:Number,
		decimal:true
	},
	evaluacionC:{
		type:Number,
		decimal:true
	},
	examenF_e:{
		type:Number,
		decimal:true
	},
	examenF_p:{
		type:Number,
		decimal:true
	},
	total:{
		type:Number,
		decimal:true
	},
	segundaInstancia:{
		type:Number,
		decimal:true
	},
	aprobado:{
		type:Boolean
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
});
Notas.attachSchema(notasSchema);


//kardex estudiante
var kardexEstudianteSchema = new SimpleSchema({
	idUs:{
		type:String
	},
	id_gestion:{
		type:String
	},
	id_carrera:{
		type:String
	},
	id_modulos:{
		type:[String]
	},
	fechaCreacion:{
		type:Date,
		autoValue:function(){
			if (this.isInsert) {
		        return new Date();
		      } else if (this.isUpsert) {
		        return {$setOnInsert: new Date()};
		      } else {
		        this.unset();  // evitar que el usuario modifique
		      }
		    
		}
	},
	fechaActualizacion:{
		type:Date,
		autoValue:function(){
				return new Date()
		}
	}
});
KardexEstudiante.attachSchema(kardexEstudianteSchema);

//para las imagenes de avatar
var imagestorage = new FS.Store.FileSystem("images", {path:"N:/SISTEMA_TESIS/uploads"});
Images = new FS.Collection("images",{
	stores: [imagestorage]
})