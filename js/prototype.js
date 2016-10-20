reApp.factory('prototypeFactory', function($rootScope, $q, $timeout, $state) {

	return {

		loadQuestions: function (questionsGroup) {

			var questions = [];

			switch (questionsGroup) {

				case 'interest':
					questions = [{
							title: '有趣的問題 1',
							tags: ['javascript', 'angularjs'],
							votes: 0,
							answers: 0,
							views: 3
						}, {
							title: '有趣的問題 2',
							tags: ['c#', 'java'],
							votes: 0,
							answers: 2,
							views: 4
						}];
					break;

				case 'hot':

					questions = [{
						title: '熱門的問題 1',
						tags: ['node.js', 'c#', 'sql'],
						votes: 2,
						answers: 121,
						views: 12345
					}, {
						title: '熱門的問題 2',
						tags: ['xcode', 'android', 'ionic', 'angular'],
						votes: 1234,
						answers: 20,
						views: 123412
					}];

					break;

				case 'month':

					questions = [{
						title: '本月熱門的問題 1',
						tags: ['javascript', 'html', 'css', 'angularjs', 'node.js', 'sails.js', 'ionic'],
						votes: 212,
						answers: 2102,
						views: 124124
					}, {
						title: '本月熱門的問題 2',
						tags: ['c#', '.net', 'c++'],
						votes: 21,
						answers: 123,
						views: 314
					}];

					break;

			}
			
			return questions;

		},

		loadSearchResult: function () {

			return [{
				type: 'A',
				title: '在 Angular JS 的 Submit form 處按 Enter',
				content: '/&gt;&lt;input type="text" ng-model="email"/&gt; &lt;/form&gt; EDIT: 對應那個關於 <b>submit button</b> 的評語，請看 「提交一個 form 而不需按 <b>submit button</b>」這篇文章，那處有關於 &lt;input ... type="<b>submit</b>" style="position: abosolute; left: -9999px; width: 1px; height: 1px;"/&gt; 的方案，如你不喜歡隱藏 <b>submit button</b> 的方案，你便應該把 Enter 絪綁到一個 controller function ...',
				time: '2013-03-14',
				username: 'eterps',
				votes: 383
			}, {
				type: 'Q',
				title: 'AngularJS - 當有必填的字段時不要提交 form',
				content: '我有一個 <b>AngularJS</b> Form，當中有 3 個必填的字段 (用 ng-required). 若沒有觸動過 form 內其他地方，只拍 \'<b>Submit</b>\' 鍵時 (ng-click="submit"), 我怎樣觸發 …',
				tags: ['javascript', 'angularjs', 'html5', 'form', 'Ionic'],
				time: '2015-09-24',
				username: 'Android Noob',
				votes: 1,
				answers: 3
			}, {
				type: 'Q',
				title: 'AngularJS 獨特的該揍的驗證指令',
				content: '用戶按 <b>submit</b> 鍵，這時 foo-ba 是錯誤的，但當按了 <b>submit</b> 鍵後，用戶便可以繼續，所以我有一個問題: 這個怎樣解決...所以，現在，我現在仍然探討著 AngularJS 的世界及遇到一問題，我正在開發一個很原始的 blog 應用程式，以 Firebase 支持，我想以 Angular 驗證...',
				tags: ['angularjs', 'angularjs-directive', 'firebase'],
				time: '2014-05-31',
				username: 'Diederik',
				votes: 0,
				answers: 0
			}, {
				type: 'Q',
				title: 'AngularJS: 跟進每一個同時上載的檔的狀態',
				content: '當按了 <b>submit</b> 鍵，一個列陣的檔案（$scope.files，可以最少是一個檔，最多可以是用戶所想的）經過 FormData 和 XMLHttpRequest 在我的 angular function 內被提交了... onprogress 像沒有行過，但在 .onload 處做了一些小改動後，我看到很多奇怪的行為...',
				tags: ['javascript', 'angularjs'],
				time: '2012-11-27',
				username: 'Scott',
				votes: 39,
				answers: 2
			}]
		},

		getReputation: function () {

			return Math.round(Math.random() * 10000);
		},

		getNumOfBadges: function () {
			return Math.round(Math.random() * 1000);
		},

		login: function () {

			var p = $q.defer();
			$timeout(function () {
				p.resolve(true);
			}, 1000)
			return p.promise;

		},

		userSignUp: function () {
			
			$rootScope.prevState = 'userSignedUp';
			$state.go('doLogin');

		}

	}

})