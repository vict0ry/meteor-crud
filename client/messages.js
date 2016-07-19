Template.Header.helpers({

    unreadMessages: function() {
        getMessages = Messages.find(
        { $and: [ { notified: false }, { recipientId: Meteor.userId() } ] }
        );
        getMessages.forEach(function(row){
          Messages.update({_id: row._id}, {$set: {notified: true} });
        });
        return getMessages;


    },
    testAction(){
      return console.log(this._id);
    },

    unreadMessagesFull: function() {
      // getAllMessages = getAllMessages.find({
      //   notified:false,
      //   author: { $ne: Meteor.userId() }
      // });
      // return getAllMessages;
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
        return getAllMessages.find({recipientIdMessage:id});
    }
});

Template.FullMessage.onRendered(function () {
            var id = FlowRouter.getParam('id');
            var findmessageOwner = Messages.find({_id: id}).fetch();

            if(findmessageOwner[0].recipientId == Meteor.userId()){ //if user is recipient then mark message as a readed.
                Messages.update({_id: id}, {$set: {readed: true} });
            }


            var updateMessages = getAllMessages.find({
              recipientIdMessage:id
            });
            updateMessages.forEach(function(row){
              messageId = row._id;
              setTimeout(function(){
                getAllMessages.update({_id: messageId}, {$set: {readed: true} },{multi:true});
              }, 1000);
            });
});


Template.Header.events({

    'click .close' () {
        alert('done');
        Meteor.call("removeTask", this._id)
    }

});
