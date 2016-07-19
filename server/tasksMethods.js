//Roles.addUsersToRoles("9ewiF8JTNp77Pmijw", 'intern', Roles.GLOBAL_GROUP);


Meteor.methods({

    removeTask: function(id,collection) {
      if (!collection){
        collection = Tasks;
      }
      console.log('remove');
            const canDelete = Roles.userIsInRole(this.userId,['admin']);
    if (!canDelete) {
        throw new Meteor.Error('unauthorized','Only admins and moderators can delete posts.');
    }

        collection.remove(id);
    }
});

Meteor.methods({
    finishTask: function(id, isDone) {
        Tasks.update(id, {
            $set: {
                isDone: !isDone
            }
        });
    }
});

Meteor.methods({
    changeTask: function(id, edit) {
        Tasks.update(id, {
            $set: {
                edit: !edit
            }
        });
    }
});

Meteor.methods({
    copyTask: function(projectName, estimation, worked, projectDescription, ratio) {
        Tasks.insert({
            projectName: 'Project Name',
            estimation: 0,
            worked: 0,
            projectDescription: 'projectDescription',
            ratio: 0
        });
    }
});



Meteor.methods({
    displayTasks: function() {
        return Tasks.find({});
    }
});



Meteor.methods({
    updateAnything: function(id, whatToChange) {
        Tasks.update(id, {
            $set: whatToChange
        });
    }
});
// Meteor.methods({
//   updateDifferenceTime(id){
//     console.log('die');
//     currentTask = Tasks.findOne({
//       _id: id,
//     });
//
//     userTimes = UserTimes.find({
//       parentId: id
//     });
//     userTimes.forEach(function(row){
//       console.log(row);
//     });
//     newDifference = (currentTask.worked - currentTask.estimation).toFixed(2);
//     newDifferenceIntern = ((currentTask.worked - ((currentTask.ratio / 100) * currentTask.worked)) - currentTask.estimation).toFixed(2);
//     Tasks.update({_id: id}, {$set: {
//       difference: newDifference,
//       differenceIntern: newDifferenceIntern
//     }});
//   }
// });

Meteor.methods({
  updateWorkedTime(id,thisis){

    allTogetherWorked = 0;
    allTogetherWorkedMinusRatio = 0;

    userTimes = UserTimes.find({
      parentId: id
    });
    userTimes.forEach(function(row){
      ratio = row.ratio / 100;
      // console.log(ratio);
      workedMinusRatio = row.worked * ratio;
      allTogetherWorkedMinusRatio += row.worked - workedMinusRatio;
      allTogetherWorked += row.worked;
    });

    newDifference = allTogetherWorked - thisis.estimation;
    newDifferenceIntern = allTogetherWorkedMinusRatio - thisis.estimation;
    Tasks.update(id, {
        $set: {
            difference: newDifference,
            differenceIntern: newDifferenceIntern,
            worked: allTogetherWorked,
            workedIntern : allTogetherWorkedMinusRatio
        }
    });

  }
});

Meteor.methods({
  createHistory(hEstimation,hWorked,hRatio,get){
    if (hEstimation || hWorked || hRatio !== 0){

      function takeColor(value){
        if (value > 1){
          color = 'text-success';
        }
        else if (value < -1){
          color = 'text-danger';
        }
        else{
          color = null;
        }
        return color;
      }

      if(hEstimation !== 0 ){
        TasksHistory.insert({
          parentId : get._id,
          estimation: hEstimation,
          worked : hWorked,
          ratio: hRatio,
          user: get.owner,
          color: {
            cEstimation: takeColor(hEstimation),
            cWorked: takeColor(hWorked),
            cRatio: takeColor(hRatio)
          },
          createdAt: new Date()
        });
      }


      if (hWorked !== 0){
        Contributes.insert({
          parentId : get._id,
          user: get.owner,
          worked: hWorked
        });
      }

    }
  }
});
Meteor.methods({
  removeAllRelatedToTask(id){
    historyTasks = TasksHistory.find({
      parentId: id
    });
    historyTasks.forEach(function(row){
      TasksHistory.remove({_id:row._id});
    });

    assignations = Assignations.find({
      parentId: id
    });
    assignations.forEach(function(rowAssignation){
      Assignations.remove({_id:rowAssignation._id});
    });

    userTimesval = UserTimes.find({
      parentId: id
    });

    userTimesval.forEach(function(rowUserTimes){
      UserTimes.remove({_id:rowUserTimes._id});
    });
  }
});
