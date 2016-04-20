Roles.addUsersToRoles("9ewiF8JTNp77Pmijw", 'intern', Roles.GLOBAL_GROUP);


Meteor.methods({

    removeTask: function(id) {
            const canDelete = Roles.userIsInRole(userId,['admin']);
    if (!canDelete) {
        throw new Meteor.Error('unauthorized','Only admins and moderators can delete posts.');
    }
        Tasks.remove(id);
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
            projectName: projectName,
            estimation: estimation,
            worked: worked,
            projectDescription: projectDescription,
            ratio: ratio
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