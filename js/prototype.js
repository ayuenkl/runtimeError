reApp.factory('prototypeFactory', function() {

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
			}]
		}

	}

})