Template.FullTask.helpers({
    fullTask(){
        var id = FlowRouter.getParam('id');
        return Tasks.findOne({_id:id});
    },
    userTimes(){
      var id = FlowRouter.getParam('id');

      userTimes = UserTimes.find({parentId:id});
      return userTimes;
    },
    userTotalTimes(){
      var users = [];
      function uniqueArray(array,item){
        var result = array.indexOf(item);
        if (result == -1){
          array.push(item);
        }
      }
      var id = FlowRouter.getParam('id');
      var totalTimesArray = [];
      userList = Assignations.find({
        parentId : id
      });
      userList.forEach(function(row){
        for(i=0;i<row.users.length;i++){
          totalTimes = UserTimes.find({parentId:id, username:row.users[i]});
          totalWorked = 0;
          totalWorkedWithRatio = 0;
          totalTimes.forEach(function(newrow){
            username = newrow.username;
            totalWorked += newrow.worked;
            minusRatio = newrow.worked - (newrow.worked * (newrow.ratio / 100));
            totalWorkedWithRatio += minusRatio;
          });

          if(totalWorked > 0){
            totalTimesArray.push({
              username: username,
              time : totalWorked,
              internTime: totalWorkedWithRatio.toFixed(2)
            });
          }

          console.log(totalTimesArray);
        }
      });

      return totalTimesArray;
    },
    fullTaskHistory(){
        var id = FlowRouter.getParam('id');
        historyTasks = TasksHistory.find({
          parentId:id
        });
        return historyTasks;
    },
    usersWorkingOnProject(){
      var id = FlowRouter.getParam('id');
      historyTasks = TasksHistory.find({
        parentId:id
      });


      users = [];
      worked = [];

      function uniqueArray(array,item){
        var result = array.indexOf(item);
        if (result == -1){
          array.push(item);
        }
      }

      uniqueUsers = historyTasks.forEach(function(row){
        uniqueArray(users,row.user);
      });

      return users;
    },
    assignedUsers(){
      var id = FlowRouter.getParam('id');
      assignedUsers = Assignations.find({
        parentId:id
      });
      return assignedUsers;
    },
    userList(){
      return Meteor.users.find({});
    }
});
Template.FullTask.events({
    'click .removeItem'(){
      var id = FlowRouter.getParam('id');
      UserTimes.remove({
        _id:this._id
      });
      var getFromCollection = Tasks.findOne({_id:id});
      Meteor.call("updateWorkedTime",id,getFromCollection);
    },
    'mouseenter .range'(){
      $(document).ready(function(){
        $('.range').on("change mousemove", function() {
            $(this).next().html($(this).val() + "%");
        });
      });
    },
    'click .saveUser' () {
      var id = FlowRouter.getParam('id');

      getUsers = $('.users').val();
      assignedUsers = Assignations.findOne({
        parentId:id
      });
    if(assignedUsers == undefined){
        Assignations.insert({
          parentId : id,
          users: getUsers
        });
      }
      else{
        Assignations.update({_id: assignedUsers._id}, {$set: {users: getUsers} });
      }

      //   Meteor.call("updateDifferenceTime", id);
    },
    'click .saveTime' () {
      summNumberVal = 0;
      $('input[type=number]').each(function(){
        var id = FlowRouter.getParam('id');
        userTime = parseInt($(this).val());
        sliderVal = $(this).next("input[type=range]").val();
        username = $(this).attr('name');

        if(userTime){
          if (sliderVal > 0){
            MinusnumberVal = (sliderVal / 100) * userTime;
            workedMinusRatio = userTime - MinusnumberVal;
          }
          else {
            workedMinusRatio = userTime;
          }

          var getTask = Tasks.findOne({
            _id: id
          });

          //****** UPDATE WORKED TIME
          var getFromCollection = Tasks.findOne({
            _id:id
          });
          Meteor.call("updateWorkedTime",id,getFromCollection);
          //****** END updating working time

          numberValDiff = getTask.difference + userTime;
          numberValDiff = numberValDiff.toFixed(2);
          workedMinusRatio = getTask.differenceIntern + workedMinusRatio;
          workedMinusRatio = workedMinusRatio.toFixed(2);


          Tasks.update(id, {
              $set: {
                  difference: numberValDiff,
                  differenceIntern: workedMinusRatio,
              }
          });

          UserTimes.insert({
            username: username,
            worked: userTime,
            ratio : sliderVal,
            parentId : id
          });
        }
        else{
          // emptyUserName = $(this).attr('name')
          // alert('')
          // console.log();
        }


      });
    }

});
