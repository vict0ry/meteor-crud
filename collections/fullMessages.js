getAllMessages = new Mongo.Collection('getAllMessages');

AllMessagesSchema = new SimpleSchema({
    author: {
        type: String,
        label: "Author",
        autoValue() {
            return Meteor.userId()
        },
        autoform: {
            type: "hidden"
        }
    },
    message: {
        label: "Reply",
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
    recipientIdMessage:{
        type: String,
        label: "RecipientMessage",
        autoform:{
            type: "hidden"
        }
    },
    recipientId:{
        type: String,
        label: "RecipientIdMessage",
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



getAllMessages.attachSchema(AllMessagesSchema);
