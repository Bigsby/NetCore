module.exports = {
    RegisterComponents: function(app) {
        app.component("home", {
            templateUrl: templatePath("home"),
            controller: function(data, $state) {
                angular.extend(this, data.home);
                this.go = function(state, params) {
                    console.log("going!");
                    $state.go(state, params);
                }
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

        app.component("step", {
            templateUrl: templatePath("step"),
            controller: function($stateParams) {
                this.path = "steps/" + $stateParams.platform + "/" + $stateParams.step + ".html";
            }
        });
    },
    RegisterStates: function(stateProvider) {
        stateProvider.state({
            "name": "home",
            "url": "/",
            "component": "home"
        });

        stateProvider.state({
            "name": "step",
            "url": "/step/:step/:platform",
            "component": "step",
            "params": {
                "step": null,
                "platform": null
            }
        });
    }
}