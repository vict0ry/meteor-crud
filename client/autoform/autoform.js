

// hook, on added Task, count difference
AutoForm.addHooks(null, {
    onSuccess: function(operation, result, template) {

      get = this.insertDoc;
      if (get == null){
        get = this.currentDoc;

        var getFromCollection = Tasks.findOne({_id:get._id});
        Meteor.call("updateWorkedTime",get._id,getFromCollection);
      }
      else {
        findMeTask = Tasks.findOne({
          _id:this.docId
        });
        hEstimation = findMeTask.estimation;
        hWorked = 0;
        hRatio = 0;
        get = 0;
        console.log(this);
        Meteor.call('createHistory',hEstimation,hWorked,hRatio,findMeTask);
        FlowRouter.go('home');
      }


        difference = (getFromCollection.worked - getFromCollection.estimation).toFixed(2);
        differenceIntern = ((getFromCollection.worked - ((getFromCollection.ratio / 100) * getFromCollection.worked)) - getFromCollection.estimation).toFixed(2);

        Tasks.update(get._id, {
            $set: {
                edit:false
            }
        });

        hEstimation = getFromCollection.estimation - get.estimation;
        hWorked = getFromCollection.worked - get.worked;
        hRatio = getFromCollection.ratio - get.ratio;

        Meteor.call('createHistory',hEstimation,hWorked,hRatio,get);

    }
});

var messagestHooks = {
  before: {
    insert: function(doc){
      var recipientIdMessage = FlowRouter.getParam('id');
      var recipientId = FlowRouter.getParam('id');
      doc.recipientIdMessage = recipientIdMessage;
      doc.recipientId = recipientId;
      return doc;
    }
  }
};

AutoForm.addHooks(['messagesForm'],messagestHooks);
