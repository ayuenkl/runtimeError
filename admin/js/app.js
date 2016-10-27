var app = angular.module('HackgaAdmin', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'login',
		url: '/login',
		templateUrl: './templates/login.html',
		controller: function (adminPrototype) {
			var ctrl = this;

			ctrl.doLogin = function () {
				adminPrototype.doLogin();
			}
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'main',
		url: '/main',
		template: 'To be implemented...',
		controller: function ($rootScope, $state) {
			if (!$rootScope.isLoggedIn) {
				$state.go('login');
			}
		}
	});

	$urlRouterProvider.otherwise('/main');

});
