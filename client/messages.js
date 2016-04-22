Template.Header.helpers({

    unreadMessages: function() {
        return Messages.find(
        { $and: [ { readed: false }, { recipientId: Meteor.userId() } ] }
        );
    }

});


Template.MyMessages.helpers({
    allMessages: function() {
        return Messages.find({ recipientId: Meteor.userId() });
    }
});

Template.FullMessage.helpers({
    fullMessage: function() {
        var id = FlowRouter.getParam('id');
        return Messages.findOne(id);
    }
});

Template.FullMessage.onRendered(function () {
            var id = FlowRouter.getParam('id');
            Messages.update(id, 
        {
            $set: {readed: true}
        });
});


Template.Header.events({

    'click .close' () {
        alert('done');
        Meteor.call("removeTask", this._id)
    }
    
});