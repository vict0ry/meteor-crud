AutoForm.addHooks(null, {
    onSuccess: function(operation, result, template) {
        FlowRouter.go('/');
    }
});
