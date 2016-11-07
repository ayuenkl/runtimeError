app.factory('SEOFactory', function($rootScope, APPNAME) {

	return {

		setPageTitle: function (currState) {
			
			var pageTitle = null;

			switch (currState.name) {
				case 'home.interest':
					pageTitle = '你有興趣的問題';
					break;
				case 'home.hot':
					pageTitle = '熱門的問題';
					break;
				case 'home.month':
					pageTitle = '本月熱門的問題';
					break;
				case 'question':
					pageTitle = $rootScope.customPageTitle;
					break;
				case 'searchResult':
					pageTitle = $rootScope.customPageTitle + ' - 搜索結果';
			}

			$rootScope.pageTitle = pageTitle? pageTitle + ' - ' + APPNAME : APPNAME;
		}
	}
});

app.factory('NavFactory', function ($rootScope) {

	return {

		setNavTab: function (currState) {

			switch (currState.name) {
				case 'home.interest':
				case 'home.hot':
				case 'home.month':
				case 'question':
				case 'searchResult':
					$rootScope.activeTab = 0;
					break;
				case 'askQuestion':
					$rootScope.activeTab = 1;
					break;
				case 'authUser.login':
				case 'authUser.signUp':
				case 'userSignnedUp':
				case 'user':
					$rootScope.activeTab = 2;
					break;
			}

		}
	}
})
