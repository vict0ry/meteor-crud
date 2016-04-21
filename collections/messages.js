Messages = new Mongo.Collection('messages');

MessagesSchema = new SimpleSchema({
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
    whatAbout: {
        label: "project name",
        type: String
    },
    message: {
        label: "Description",
        type: String,
        autoform: {
            rows: 5
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



Messages.attachSchema(MessagesSchema);