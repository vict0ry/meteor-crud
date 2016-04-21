Template.FullTask.helpers({
    fullTask(){
        var id = FlowRouter.getParam('id');
        return Tasks.findOne({_id:id});
    }
});