reApp.factory('SEOFactory', function($rootScope, APPNAME) {

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
				case 'QAList':
					pageTitle = $rootScope.customPageTitle + ' - 搜索結果';
			}

			$rootScope.pageTitle = pageTitle? pageTitle + ' - ' + APPNAME : APPNAME;
		}
	}
});