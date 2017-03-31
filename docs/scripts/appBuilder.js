module.exports = {
    RegisterComponents: function (app) {
        app.component("home", {
            templateUrl: templatePath("home"),
            controller: function (data, $state) {
                angular.extend(this, data.home);
                this.go = function (state, params) {
                    console.log("going!");
                    $state.go(state, params);
                }

                var stepCount = 0;
                data.home.steps.forEach(function (step) {
                    if (step.skipNumber)
                        return;
                        
                    step.index = ++stepCount;
                });
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
            controller: function ($stateParams) {
                this.path = "steps/" + $stateParams.category + "/" + $stateParams.step + ".html";
            }
        });
    },
    RegisterStates: function (stateProvider) {
        stateProvider.state({
            "name": "home",
            "url": "/",
            "component": "home"
        });

        stateProvider.state({
            "name": "step",
            "url": "/step/:category/:step",
            "component": "step",
            "params": {
                "step": null,
                "category": null
            }
        });
    }
}