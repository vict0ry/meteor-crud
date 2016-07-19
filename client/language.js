
Template.Header.events({
     'click .czech' (){
        getUserLanguage = function () {
          return "cs";
        };
         
        Session.set("showLoadingIndicator", true);
         
        TAPi18n.setLanguage(getUserLanguage())
        .done(function () {
            Session.set("showLoadingIndicator", false);
        })
        .fail(function (error_message) {
        console.log(error_message);
        });
     },
    
        'click .english' (){
        getUserLanguage = function () {
          return "en";
        };
         
        Session.set("showLoadingIndicator", true);
         
        TAPi18n.setLanguage(getUserLanguage())
        .done(function () {
            Session.set("showLoadingIndicator", false);
        })
        .fail(function (error_message) {
        console.log(error_message);
        });
     }
});



