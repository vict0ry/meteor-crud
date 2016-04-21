Template.UserProfile.helpers({
    avatar(){
        var id = FlowRouter.getParam('id');
        return Uploads.findOne({identifyMe:id});
    }
});


Template.UserProfile.helpers({
    userInfo(){
        var id = FlowRouter.getParam('id');
        return Meteor.users.findOne({_id:id});
    }
});


Template.UserProfile.helpers({
    userTasks(){
        var id = FlowRouter.getParam('id');
        return Tasks.find({author:id});
    }
});