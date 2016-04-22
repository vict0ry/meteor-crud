Template.Header.helpers({

    unreadMessages: function() {
        return Messages.find(
        { $and: [ { readed: false }, { recipientId: Meteor.userId() } ] }
        );
    }

});