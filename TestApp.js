Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {

	// Send button click event
  Template.main.events({
    'click #send_button' : function () {
			if (console !== "undefined") {    
    		console.log("Sending message: " + $("#message_input").val());
			} 	
			name = $("#name_input").val() || "<<anonymous>>";
      Messages.insert(
				{name : name,
				 content : $("#message_input").val(), 
				 likes : 0,
				 time : new Date().getTime(),
				 user_time : new Date().toLocaleString()
        }
      ); 
      $("#message_input").val(''); 
   }
  });  
  
	// Clear button click event
	Template.main.events({
		'click #clear_button' : function() {
			Meteor.call('clear_all_messages');	
		}
	});

	// Like button click event
	Template.main.events({
		'click .like_button' : function() {
			Messages.update(this._id, {$inc : {likes : 1}} );
		}
	});


  Template.main.message_list = function() {
			return Messages.find({}, {sort : {time : -1}});
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
		return Meteor.methods({
			'clear_all_messages' : function() {
				return Messages.remove({});
			}
  	});
	});
}
