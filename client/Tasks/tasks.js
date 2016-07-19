if (Meteor.isClient) {
    Meteor.subscribe('tasks');
    Meteor.subscribe('items');
    Meteor.subscribe('uploads')
}

Meteor.startup(function() {
    Uploader.finished = function(index, file) {

        file.identifyMe = Meteor.userId(); // for indetificate whom belong this picture

        Uploads.insert(file);

    }
});

Template.Profile.helpers({
    myAvatar: function(){
        return Uploads.findOne({identifyMe:Meteor.userId()});
    }
});


Template.task.helpers({
    tasks: function() {
        return Tasks.find({});
    },
    ajdi: function() {
        return this._id;
    },
    colorWorked(){
      if (this.difference > 0){
        return false;
      }
      else {
        return true;
      }
    },
    colorWorkedIntern(){
      if(this.differenceIntern > 0){
        return false;
      }
      else{
        return true;
      }
    }
});

Template.task.events({

    'click .fa-trash' () {




      var r = confirm("Are you sure you want to remove it ?");
      if (r == true) {
          Meteor.call("removeTask", this._id);
          // function removeAllRelatedToTask(id){
          //   historyTasks = TasksHistory.find({
          //     parentId: id
          //   });
          //   historyTasks.forEach(function(row){
          //     console.log(id);
          //     console.log(row);
          //     console.log('^^^^^^^^');
          //     TasksHistory.remove({_id:row._id});
          //   });
          //
          //   assignations = Assignations.find({
          //     parentId: id
          //   });
          //   assignations.forEach(function(rowAssignation){
          //     Assignations.remove({_id:rowAssignation._id});
          //   });
          //
          //   userTimesval = UserTimes.find({
          //     parentId: id
          //   });
          //
          //   userTimesval.forEach(function(rowUserTimes){
          //     UserTimes.remove({_id:rowUserTimes._id});
          //   });
          // }
          //
          // removeAllRelatedToTask(this._id);

          
          //remove all related to this task :
          Meteor.call("removeAllRelatedToTask",this._id);
      }
    },
    'click .fa-flag-checkered' () {
        Meteor.call("finishTask", this._id, this.isDone)
    },
    'click .fa-pencil' () {
        Meteor.call("changeTask", this._id, this.edit)
    },
    'click .fa-files-o' () {
        //inside this function we are sending what we will copy :
        Meteor.call("copyTask", this.projectName, this.estimation, this.worked, this.projectDescription, this.ratio)
    },

    'click .edit' (event) {
        event.target.contentEditable = "true";
    },
    'keypress .edit' (event) {
        if (event.which == 13) {
          // historyTasks = TasksHistory.find({
          //   parentId:'FsgCKFoMkAzezyqw9'
          // });
          // historyTasks.forEach(function(row){
          //   TasksHistory.remove({_id:row._id});
          //   console.log(row._id);
          // });
          // console.log(history);
          // call function that will recalculate time
          //test
          // console.log(this);

            event.preventDefault();
            whatClass = event.target.classList[0];
            // console.log(whatClass);
            whatValue = $(event.target).text();

            if (whatClass == "worked"){
              // console.log(event.target);
            }

            nameIt = whatClass;
            whatToChange = {
                [nameIt]: whatValue // change property name in object
            };
            // console.log(this._id);
            // remove it
            recount = Tasks.findOne({
              _id: this._id
            });

            difference = {
                difference: (recount.worked - recount.estimation).toFixed(2)
            }; // count difference

            differenceIntern = {
                differenceIntern: ((recount.worked - ((recount.ratio / 100) * recount.worked)) - recount.estimation).toFixed(2)
            }; //count intern difference




            // task = UserTimes.findOne({
            //   _id: this._id
            // });
            // //test//
            // //test//
            // task.estimation - this.estimation;
            //


            this.estimation = whatValue;
            Meteor.call("updateWorkedTime",this._id,this);

              var getFromCollection = Tasks.findOne({_id:this._id});
              Meteor.call("updateWorkedTime",get._id,getFromCollection);

              hEstimation = this.estimation - getFromCollection.estimation;
              hWorked = this.worked - getFromCollection.worked;
              hRatio = this.ratio - getFromCollection.ratio;

              Meteor.call('createHistory',hEstimation,hWorked,hRatio,this);



            //
            // TasksHistory.insert({
            //   parentId : this._id,
            //   estimation: this.estimation,
            //   user: Meteor.user().username
            // });



/******************* COUNT DIFFERENCE AND DIFFERENCE INTERN AFTER PRESS ENTER ****************************/
            // allTogetherWorked = 0;
            // allTogetherWorkedMinusRatio = 0;
            //
            // userTimes = UserTimes.find({
            //   parentId: this._id
            // });
            // userTimes.forEach(function(row){
            //   ratio = row.ratio / 100;
            //   // console.log(ratio);
            //   workedMinusRatio = row.worked * ratio;
            //   allTogetherWorkedMinusRatio += row.worked - workedMinusRatio;
            //   allTogetherWorked += row.worked;
            // });
            //
            // newDifference = allTogetherWorked - this.estimation;
            // newDifferenceIntern = allTogetherWorkedMinusRatio - this.estimation;
            // Tasks.update(this._id, {
            //     $set: {
            //         difference: newDifference,
            //         differenceIntern: newDifferenceIntern,
            //         worked: allTogetherWorked,
            //         workedIntern : allTogetherWorkedMinusRatio
            //     }
            // });
/******************* END COUNT DIFFERENCE AND DIFFERENCE INTERN AFTER PRESS ENTER ****************************/





            /***************  update contenteditable) ****************/
            Meteor.call("updateAnything", this._id, whatToChange);


            document.execCommand('undo');

            /***************  update contenteditable) ****************/
            event.target.contentEditable = "false";
        }
    }
});
