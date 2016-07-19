Messages = new Mongo.Collection('messages');

MessagesSchema = new SimpleSchema({
    author: {
        type: String,
        label: "Author",
        defaultValue() {
            return Meteor.userId()
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
        defaultValue(){
          return Meteor.user().username
        },
        autoform: {
            type: "hidden"
        }
    },
    recipientId:{
        type: String,
        label: "Recipient",
        autoform:{
            type: "hidden"
        }
    },
    readed: {
        type: Boolean,
        label: "Readed",
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    },
    notified: {
        type: Boolean,
        label: "Readed",
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    }
});



Messages.attachSchema(MessagesSchema);
