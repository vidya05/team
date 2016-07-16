/**
 * Student.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
      type: 'string',
      required: true
    },
    team:{
      model:'team'
    }
  },

  beforeValidate: function(student, cb) {
  	console.log('The new Before Create'+ student.team)
  		Team.findOne({id: student.team}).exec(function teamfound(err,found){
  			capacity = found.capacity
  			
  			Student.count({team : student.team}).exec(function countCB(err,count){
	  			if (count >= capacity){
	  				cb({"error":"Team exceeded capacity"});
	  			}
	  			else{
	  				cb(null,student);
	  			}

		});

  		});
		
}
  
};
