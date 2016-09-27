var reApp = angular.module('reApp', ['ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'ayUtils']);

reApp.constant('APPNAME', 'Runtime Error');

reApp.config(function($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'home',
		abstract: true,
		template: '<home />'
	});

	sp.state({
		name: 'home.interest',
		url: '/interest',
		views: {
			'homeNav': {
				template: '<home-nav questions-group="interest" />'
			},
			'homeQuestList': {
				template: '<questions-list questions-group="interest" />'
			}
		}

	});

	sp.state({
		name: 'home.hot',
		url: '/hot',
		views: {
			'homeNav': {
				template: '<home-nav questions-group="hot" />'
			},
			'homeQuestList': {
				template: '<questions-list questions-group="hot" />'
			}
		}
	});

	sp.state({
		name: 'home.month',
		url: '/month',
		views: {
			'homeNav': {
				template: '<home-nav questions-group="month" />'
			},
			'homeQuestList': {
				template: '<questions-list questions-group="month" />'
			}
		}
	});

	$urlRouterProvider.otherwise('/interest');

});

reApp.run(function ($rootScope, SEOFactory) {

	$rootScope.$on('$stateChangeSuccess', function (event, toState) {

		SEOFactory.setPageTitle(toState);

	});

	$rootScope.pageTitle = 'Runtime Error';

});

