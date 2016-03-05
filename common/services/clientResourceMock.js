(function () {
	"use strict";

	var clients = [];
	var getClients = function () {
		$.ajax({
			url: "https://hh-incident-monitoring-service.herokuapp.com/people", success: function (data) {
				//Update your dashboard gauge
				for (var i = 0; i < data.people.length; i++) {
					var client = data.people[i];
					clients.push(client);
				}
				toastr.info("people updated!")
			}, dataType: "json"
		});
	}
	setInterval(function () {
		getClients();
	}, 10000);


	var app = angular
                .module("clientResourceMock",
                ["ngMockE2E"]);

	app.run(function ($httpBackend) {
		 clients = [
			{
				Identity: {
					CITIZEN: "US",
					DOB: "7/31/1969",
					FNAME: "MILES",
					LNAME: "MARTIN",
					MNAME: "ROBERT",
					RACE: "C",
					SEX: "M"
				},
				Sources: [
				"83d150d743734097a4804a81af4dbea9",
				"4f8353f705924e6b90ed6c9e464c29c4",
				"b05b51a063bb4e05b84cc15c29f8848b"
				],
				_id: "361cee526d0a4a1ba24aa4ebfc1e278f",
				_rev: "4-21720edb8c58cbd57538268c9971a3c5",
				events: [
				{
					CASE_ID: "1457",
					DATE: "3/6/2016",
					HEARING_TYPE: "BENCH",
					TIME: "8:00 AM",
					TITLE: "MARTIN, ROB",
					_id: "001caddee7d946cfbd3381f0eae5da16"
				}
				]
			}
			];

		var clientUrl = "api/clients"

		$httpBackend.whenGET(clientUrl).respond(clients);

		var editingRegex = new RegExp(clientUrl + '/[0-9a-z][0-9a-z]*', '')
		$httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
			var client = { "clientId": "0" };
			var parameters = url.split('/');
			var length = parameters.length;
			var id = parameters[length - 1];

			if (id) {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i]._id == id) {
						client = clients[i];
						break;
					}
				}
			}
			return [200, client, {}];
		});


		$httpBackend.whenPOST(clientUrl).respond(function (method, url, data) {
			var client = angular.fromJson(data);

			if (!client._id) {
				client._id = clients[clients.length - 1]._id + "1";
				clients.push(client);
			}
			else {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i]._id == client._id) {
						clients[i] = client;
						break;
					}
				}
			}
			return [200, client, {}];
		});

		$httpBackend.whenGET(/app/).passThrough();

	})
}());