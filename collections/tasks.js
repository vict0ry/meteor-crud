Tasks = new Mongo.Collection('tasks');
Items = new Mongo.Collection('items');
Uploads = new Mongo.Collection('uploads');



if (Meteor.isServer) {
    Meteor.publish("tasks", function() {
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            return Tasks.find();
        }
    });

    Meteor.publish('items', function() {
        return Items.find();
    });
    
    Meteor.publish('uploads', function() {
        return Uploads.find();
    });
}


TaskSchema = new SimpleSchema({
    author: {
        type: String,
        label: "Author",
        autoValue() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    },
    projectName: {
        label: "project name",
        type: String
    },
    estimation: {
        label: "Estimation time",
        type: Number,
        decimal: true,
        autoform: {
            afFieldInput: {
                type: "text"
            }
        }
    },
    worked: {
        type: Number,
        decimal: true,
        autoform: {
            afFieldInput: {
                type: "text"
            }
        }
    },
    projectDescription: {
        label: "Description",
        type: String,
        autoform: {
            rows: 5
        }
    },
    ratio: {
        type: Number,
        max: 100,
        min: 0,
        autoform: {
            type: "noUiSlider",
            step: 1,
            noUiSlider_pipsOptions: {

                density: 1
            }
        }
    },
    createdAt: {
        type: Date,
        label: "Created at",
        autoValue() {
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    },
    difference: {
        type: Number,
        decimal: true,
        label: "difference",
        defaultValue: 0,
        autoform: {
            type: "hidden"
        }
    },
    differenceIntern: {
        type: Number,
        decimal: true,
        label: "differenceIntern",
        defaultValue: 0,
        autoform: {
            type: "hidden"
        }
    },
    isDone: {
        type: Boolean,
        label: "Is done",
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    },
    edit: {
        type: Boolean,
        label: "edit",
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    },
    owner: {
        type: String,
        label: "Username",
        autoValue() {
            return Meteor.user().username
        },
        autoform: {
            type: "hidden"
        }
    }
});



Tasks.attachSchema(TaskSchema);