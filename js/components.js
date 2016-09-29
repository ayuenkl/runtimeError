reApp.component('reNavbar', {

	templateUrl: '/templates/navbar.html',

	controller: function(APPNAME) {

		var ctrl = this;

		ctrl.appName = APPNAME;

		ctrl.isCollapsed = false;

		ctrl.searchQA = function () {
			console.log('search box submited')
		}
	}

});

