(function () {
	"use strict";

	var app = angular
                .module("clientResourceMock",
                ["ngMockE2E"]);

	app.run(function ($httpBackend) {
		var clients = [
           {
           	"Id": 1,
           	"firstName": "Milo",
           	"middleName": "Bryan",
           	"lastName": "Hadlock",
           	"birthDate": "October 18, 1975",
           	"gender": "male",
           	"homeStreet": "123 Main Street",
           	"homeCity": "SLC",
           	"homeState": "Utah",
           	"homePostalCode": "888888",
           	"maritalStatus": "Single",
           	"telephone": "8015555555",
           	"imageUrl": ""
           }
		];

		var clientUrl = "api/clients"

		$httpBackend.whenGET(clientUrl).respond(clients);

		var editingRegex = new RegExp(clientUrl + '/[0-9][0-9]*', '')
		$httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
			var client = { "clientId": 0 };
			var parameters = url.split('/');
			var length = parameters.length;
			var id = parameters[length - 1];

			if (id > 0) {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i].Id == id) {
						client = clients[i];
						break;
					}
				}
			}
			return [200, client, {}];
		});


		$httpBackend.whenPOST(clientUrl).respond(function (method, url, data) {
			var client = angular.fromJson(data);

			if (!client.Id) {
				client.Id = clients[clients.length - 1].Id + 1;
				clients.push(client);
			}
			else {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i].clientId == client.Id) {
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