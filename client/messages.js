Template.Header.helpers({

    unreadMessages: function() {
        return Messages.find(
        { $and: [ { readed: false }, { recipientId: Meteor.userId() } ] }
        );
    },
    
    unreadMessagesFull: function() {
        return getAllMessages.find(
        { $and: [ { readed: false }, { recipientId: "CRxABqcDWWbZ46Yo3" } ] }
        );
    },
    userProfile: function(){
        return Meteor.userId();
    }

});



Template.MyMessages.helpers({
    allMessages: function() {
        return Messages.find({ recipientId: Meteor.userId() });
    }
});

Template.MyMessages.helpers({
    allMessagesIsent: function() {
        return Messages.find({ author: Meteor.userId() });
    }
});

Template.FullMessage.helpers({
    fullMessage: function() {
        var id = FlowRouter.getParam('id');
        return Messages.findOne(id);
    }
});

Template.FullMessage.helpers({
    fullMessages: function() {
        var id = FlowRouter.getParam('id');
        return getAllMessages.find({recipientId:id});
    }
});

Template.FullMessage.onRendered(function () {
            var id = FlowRouter.getParam('id');
            var findmessageOwner = Messages.find({_id: id}).fetch();
            
            if(findmessageOwner[0].recipientId == Meteor.userId()){
                Messages.update({_id: id}, {$set: {readed: true} });
            }
});

//Template.Header.onRendered(function () {
//Messages.update({readed:false},{ $set:{readed:true} });
//});



Template.Header.events({

    'click .close' () {
        alert('done');
        Meteor.call("removeTask", this._id)
    }
    
});