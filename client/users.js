Template.Users.helpers({
    allUsers(){
        return Meteor.users.find({});
    }
    
});