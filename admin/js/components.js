app.component('hgNavbar', {
	templateUrl: '/admin/templates/navbar.html',
	controller: function ($rootScope) {

		var ctrl = this;

		ctrl.toggleSideMenu = function () {
			$rootScope.isSideMenuCollapsed = !$rootScope.isSideMenuCollapsed;
			if ($rootScope.isSideMenuCollapsed) {
				$rootScope.mainContentStyle = {'padding-left': '5px'}
			} else {
				$rootScope.mainContentStyle = {'padding-left': '155px'}
			}
			$rootScope.isSideMenuFloated = false;
		};

		ctrl.toggleFloatMenu = function () {
			$rootScope.isSideMenuFloated = !$rootScope.isSideMenuFloated;
			$rootScope.isSideMenuCollapsed = false;
		}
	}
})