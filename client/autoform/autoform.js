//AutoForm.addHooks(null, {
//    onSuccess: function(operation, result, template) {
//        FlowRouter.go('/');
//    }
//});

var messagestHooks = {
  before: {
    insert: function(doc){
      var recipientId = FlowRouter.getParam('id');
      doc.recipientId = recipientId;
      return doc;
    }
  }
};

AutoForm.addHooks(['messagesForm'],messagestHooks);