var reApp = angular.module('reApp', ['ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'ayUtils']);

reApp.constant('APPNAME', 'Runtime Error');

reApp.config(function($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'home',
		abstract: true,
		templateUrl: '/templates/home.html'
	});

	sp.state({
		name: 'home.interest',
		url: '/interest',
		views: {
			'homeNav': {
				templateUrl: '/templates/homeNav.html',
				controller: function () {
					var ctrl = this;
					ctrl.activeTab = 0;
				},
				controllerAs: 'ctrl'
			},
			'homeQuestList': {
				templateUrl: '/templates/questionsList.html',
				controller: function ($timeout, prototypeFactory) {

					var ctrl = this;
					ctrl.isLoading = true;
					ctrl.questions = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions('interest');
						ctrl.isLoading = false;
					}, 1000);

				},
				controllerAs: 'ctrl'
			}
		}

	});

	sp.state({
		name: 'home.hot',
		url: '/hot',
		views: {
			'homeNav': {
				templateUrl: '/templates/homeNav.html',
				controller: function () {
					var ctrl = this;
					ctrl.activeTab = 1;
				},
				controllerAs: 'ctrl'
			},
			'homeQuestList': {
				templateUrl: '/templates/questionsList.html',
				controller: function ($timeout, prototypeFactory) {

					var ctrl = this;
					ctrl.isLoading = true;
					ctrl.questions = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions('hot');
						ctrl.isLoading = false;
					}, 1000);

				},
				controllerAs: 'ctrl'
			}
		}
	});

	sp.state({
		name: 'home.month',
		url: '/month',
		views: {
			'homeNav': {
				templateUrl: '/templates/homeNav.html',
				controller: function () {
					var ctrl = this;
					ctrl.activeTab = 2;
				},
				controllerAs: 'ctrl'
			},
			'homeQuestList': {
				templateUrl: '/templates/questionsList.html',
				controller: function ($timeout, prototypeFactory) {

					var ctrl = this;
					ctrl.isLoading = true;
					ctrl.questions = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions('month');
						ctrl.isLoading = false;
					}, 1000);

				},
				controllerAs: 'ctrl'
			}
		}
	});

	sp.state({
		name: 'question',
		url: '/question/{qid}',
		templateUrl: '/templates/question.html',
		resolve: {
			// get mockup data
			Title: function ($q, $timeout, $rootScope) {
				var p = $q.defer();
				$timeout(function () {
					var pageTitle = '在 href-transitioning 下， $stateChangeSuccess 不能被觸發。';
					$rootScope.customPageTitle = pageTitle;
					p.resolve(pageTitle);
				}, 1000);
				return p.promise;
			}
		},
		controller: function ($http) {

			var ctrl = this;
			ctrl.isLoading = true;

			// for mockup purpose, randomly generate user info
			ctrl.users = [];
			$http.get('http://api.randomuser.me/?results=6')
			.then(function (response) {
				for (var i = 0; i < response.data.results.length; i++) {
					ctrl.users.push({
						username: response.data.results[i].name.first,
						avatar: response.data.results[i].picture.thumbnail
					});
				}
			})
			.finally(function () {
				ctrl.isLoading = false;
			});

		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name:'searchResult',
		url: '/search/{searchString}',
		templateUrl: '/templates/searchResult.html',
		resolve: {
			searchResult: function ($stateParams, $q, $timeout, $rootScope) {
				// simulate a search
				//$rootScope.customPageTitle = $stateParams.searchString;
				$rootScope.customPageTitle = 'angularjs submit without pressing button';
				var p = $q.defer();
				$timeout(function () {
					p.resolve();
				}, 1000);
				return p.promise;
			}
		}
	})

	$urlRouterProvider.otherwise('/interest');

});

reApp.run(function ($rootScope, SEOFactory) {

	$rootScope.$on('$stateChangeStart', function (event, toState) {
		$rootScope.isLoading = true;
		console.log('on start');
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParam) {

		SEOFactory.setPageTitle(toState);

		$rootScope.isLoading = false;

		console.log('on success', toState, toParam);

	});

	$rootScope.pageTitle = 'Runtime Error';
	$rootScope.customPageTitle = '';

});

