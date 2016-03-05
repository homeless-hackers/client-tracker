(function () {
	"use strict";

	angular
		.module("clientManagement")
		.controller("ClientEditController",
		["client",
			"$state",
			"clientService",
			ClientEditController]);

	function ClientEditController(client, $state, clientService) {
		var vm = this;

		if (vm.client && vm.client.Id) {
			vm.title = "Edit: " + vm.client.firstName;
		}
		else {
			vm.title = "New Client";
		}
	}
}());