Meteor.subscribe('publi_estudiantes');
Template.imprimirInscripcion.helpers({
	estudiante: function () {
        console.log('help');
        console.log(Meteor.users.findOne({username:'111'}));
		return Meteor.users.findOne({username:'111'});
    }
   
});
