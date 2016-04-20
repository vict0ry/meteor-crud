
if (Meteor.isClient){
    Meteor.subscribe('tasks');
}


Template.task.helpers({
    
    tasks() {
            return Tasks.find({});
        },
        ajdi() {
            return this._id;
        }
});

Template.task.events({

    'click .fa-trash' () {
        Meteor.call("removeTask", this._id)
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
            event.preventDefault();

            whatClass = event.target.classList[0];
            whatValue = $(event.target).text();

            nameIt = whatClass;
            whatToChange = {
                [nameIt]: whatValue // change property name in object
            };


            difference = {
                difference: (this.worked - this.estimation).toFixed(2)
            }; // count difference

            differenceIntern = {
                differenceIntern: ((this.worked - ((this.ratio / 100) * this.worked)) - this.estimation).toFixed(2)
            }; //count intern difference

            /***************  update contenteditable) ****************/
            Meteor.call("updateAnything", this._id, whatToChange);
            Meteor.call("updateAnything", this._id, difference);
            Meteor.call("updateAnything", this._id, differenceIntern);
            /***************  update contenteditable) ****************/

            event.target.contentEditable = "false";
        }
    }
});