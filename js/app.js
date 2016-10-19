var reApp = angular.module('reApp', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'ayUtils']);

reApp.constant('APPNAME', 'Hackga');

reApp.config(function($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'home',
		abstract: true,
		templateUrl: '/templates/home.html',
		controller: function (APPNAME) {
			var ctrl = this;
			ctrl.appName = APPNAME;
		},
		controllerAs: 'ctrl'
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
				controller: function ($timeout, prototypeFactory, $rootScope) {

					var ctrl = this;
					$rootScope.isLoading = true;
					ctrl.questions = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions('interest');
						$rootScope.isLoading = false;
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
				controller: function ($timeout, prototypeFactory, $rootScope) {

					var ctrl = this;
					$rootScope.isLoading = true;
					ctrl.questions = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions('hot');
						$rootScope.isLoading = false;
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
				controller: function ($timeout, prototypeFactory,$rootScope) {

					var ctrl = this;
					$rootScope.isLoading = true;
					ctrl.questions = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions('month');
						$rootScope.isLoading = false;
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
		controller: function ($http, prototypeFactory, $rootScope) {

			var ctrl = this;
			$rootScope.isLoading = true;

			// for mockup purpose, randomly generate user info
			ctrl.users = [];
			$http.get('http://api.randomuser.me/?results=6')
			.then(function (response) {
				for (var i = 0; i < response.data.results.length; i++) {
					ctrl.users.push({
						username: response.data.results[i].name.first,
						avatar: response.data.results[i].picture.thumbnail,
						reputation: prototypeFactory.getReputation(),
						numOfBadges: prototypeFactory.getNumOfBadges()
					});
				}
			})
			.finally(function () {
				$rootScope.isLoading = false;
			});

		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name:'searchResult',
		url: '/search/{searchString}',
		templateUrl: '/templates/searchResult.html',
		resolve: {
			searchResult: function ($stateParams, $q, $timeout, $rootScope, prototypeFactory) {
				// simulate a search
				//$rootScope.customPageTitle = $stateParams.searchString;
				$rootScope.customPageTitle = 'angularjs submit without pressing button';
				var p = $q.defer();
				$timeout(function () {
					p.resolve(prototypeFactory.loadSearchResult());
				}, 1000);
				return p.promise;
			}
		},
		controller: function (searchResult, $rootScope) {
			var ctrl = this;
			//ctrl.searchString = $stateParams.searchString;
			ctrl.searchString = 'angularjs submit without pressing button';
			ctrl.searchResult = searchResult;
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'authUser',
		abstract: true,
		templateUrl: '/templates/authUser.html'
	})

	sp.state({
		name: 'authUser.login',
		url: '/login',
		views: {
			authNav: {
				templateUrl: '/templates/authUserNav.html'
			},
			authMain: {
				templateUrl: '/templates/login.html',
				controller: function (prototypeFactory, $state) {
					var ctrl = this;
					ctrl.activeTab = 0;

					ctrl.userLogin = function () {
						$state.go('doLogin');
					}
				},
				controllerAs: 'ctrl'
			}
		}
	});

	sp.state({
		name: 'doLogin',
		resolve: {
			loggedIn: function (prototypeFactory) {
				return prototypeFactory.login();
			},
			user: function ($http) {
				return $http.get('https://randomuser.me/api/')
			}
		},
		controller: function (loggedIn, user, $rootScope, $state) {
			if (loggedIn) {
				$rootScope.isLoggedIn = true;
				$rootScope.userAvatar = user.data.results[0].picture.thumbnail;
				$state.go($rootScope.prevState);
			}
		}
	});

	sp.state({
		name: 'authUser.signUp',
		url: '/signUp',
		views: {
			authNav: {
				templateUrl: '/templates/authUserNav.html',
				controller: function () {
					var ctrl = this;
					ctrl.activeTab = 1;
				},
				controllrAs: 'ctrl'
			},
			authMain: {
				templateUrl: '/templates/signUp.html',
				controller: function (prototypeFactory) {
					var ctrl = this;
					ctrl.userSignUp = function () {
						prototypeFactory.userSignUp();
					}
				},
				controllerAs: 'ctrl'
			}
		}
	});

	sp.state({
		name: 'userSignedUp',
		url: '/signedUp',
		templateUrl: '/templates/signedUp.html'
	});

	sp.state({
		name: 'ask',
		url: '/ask',
		abstrct: true,
		template: '<ui-view></ui-view>'
	});

	sp.state({
		name: 'ask.advice',
		url: '/advice',
		templateUrl: '/templates/askAdvice.html',
		controller: function ($state) {
			var ctrl = this;
			ctrl.proceed = function () {
				if (ctrl.gotIt) {
					$state.go('ask.question');
				}
			}
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'ask.question',
		url: '/question',
		templateUrl: '/templates/askQuestion.html'
	})

	$urlRouterProvider.otherwise('/interest');

});

reApp.run(function ($rootScope, SEOFactory, NavFactory, APPNAME) {

	$rootScope.$on('$stateChangeStart', function (event, toState) {

		$rootScope.isLoading = true;
		
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParam, fromState) {

		if ((fromState.name != 'authUser.login') && (fromState.name != 'authUser.signUp') && (fromState.name != 'doLogin')) {
			$rootScope.prevState = fromState;
		}
		SEOFactory.setPageTitle(toState);
		NavFactory.setNavTab(toState);

		$rootScope.isLoading = false;

	});

	$rootScope.pageTitle = APPNAME;
	$rootScope.customPageTitle = '';
	$rootScope.isLoading = false;

});

