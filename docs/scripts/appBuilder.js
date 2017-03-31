module.exports = {
    RegisterComponents: function (app) {
        app.component("home", {
            templateUrl: templatePath("home"),
            controller: function(data){
                angular.extend(this, data.home)
            }
        });

        app.component("category", {
            templateUrl: templatePath("category"),
            bindings: {
                category: "<",
                inner: "<"
            }
        });

        app.component("item", {
            templateUrl: templatePath("item"),
            bindings: {
                item: "<"
            }
        });
    },
    RegisterStates: function (stateProvider) {
        stateProvider.state({
            "name": "home",
            "url": "/",
            "component": "home"
        });
    }
}