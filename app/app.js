(function () {
	"use strict";
	var app = angular.module("clientManagement",
                            ["common.services",
                             "ui.router",
							 "ui.mask",
							 "ui.bootstrap",
                            "clientResourceMock"]);
	app.config(["$provide", function ($provide) {
		$provide.decorator("$exceptionHandler",
			["$delegate",
				function ($delegate) {
					return function (exception, cause) {
						exception.message = "Error: " + exception.message;
						$delegate(exception, cause);
						alert(exception.message);
					}
				}
			])
	}]);
	app.config(["$stateProvider",
		"$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
        	$urlRouterProvider.otherwise("/");
        	$stateProvider
				.state("home", {
					url: "/",
					templateUrl: "app/welcomeView.html"
				})
				.state("clientList", {
					url: "/clients",
					templateUrl: "app/client/clientListView.html",
					controller: "ClientListController as vm"
				})
				.state("clientEdit", {
					abstract: true,
					url: "/clients/edit/:productId",
					templateUrl: "app/client/clientEditView.html",
					controller: "ClientEditController as vm",
					resolve: {
						clientResource: "clientResource",
						client: function (clientResource, $stateParams) {
							var clientId = $stateParams.Id;
							return clientResource.get({ Id: clientId }).$promise;
						}
					}
				})
				.state("clientEdit.info", {
					url: "/info",
					templateUrl: "app/client/clientEditInfoView.html"
				})
				.state("clientEdit.stuff", {
					url: "/price",
					templateUrl: "app/client/clientEditStuffView.html"
				})
        }]
	);
}());