Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {

    // Setup any click events in this template
    Template.main.events({
	    // Send button click event
        'click #send_button' : function () {
	        if (console !== "undefined") {    
	            console.log("Sending message: " + $("#message_input").val());
	        } 	
	        name = $("#name_input").val() || "<<anonymous>>";
            Messages.insert({
                name : name,
		        content : $("#message_input").val(), 
		        likes : 0,
		        time : new Date().getTime()
            }); 
            $("#message_input").val(''); 
        },
                
	    // Clear button click event
		'click #clear_button' : function() {
			Meteor.call('clear_all_messages');	
		},
		
	    // Like button click event
		'click .like_button' : function() {
			Messages.update(this._id, {$inc : {likes : 1}} );
		}
	});
    
    // Setup any helper functions for this template
    Template.main.helpers({
        // Get the message time in the client locale
        'locale_time' : function(epoch_time) {
            return (new Date(epoch_time)).toLocaleString()
        } 
    });

    // Get all messages, in descending chronological order
    Template.main.message_list = function() {
		return Messages.find({}, {sort : {time : -1}});
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
		return Meteor.methods({
		    // Removes all messages from the db
			'clear_all_messages' : function() {
				return Messages.remove({});
			}
  	    });
	});
}
