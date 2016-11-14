app.factory('prototypeFactory', function($rootScope, $q, $timeout, $state, $http) {

	return {

		loadQuestions: function (questionsGroup) {

			var questions = [];

			var group = (questionsGroup)? questionsGroup : 'interest';

			switch (group) {

				case 'interest':
					questions = [{
							title: '以 NodeJs sdk 在 google cloud 生成 getServingUrl()',
							body: '我正在用 Google Cloud 來儲存圖片，我還有一侍服器在運行 NodeJs，我想對每個圖片實時創造 servingUrl（又稱 magicUrl）...',
							tags: ['javascript', 'node.js', 'google-cloud-storage', 'gcloud'],
							votes: 6,
							answers: 1,
							views: 61
						}, {
							title: 'iisnode 在 windows 發生錯誤後不再接受請求',
							body: '最近，我嘗試以 nodejs 新建一個簡單的侍服器，但我遇到一些問題我自己不能解決，簡單來說，我在 iisnode 裡設定了 4 個工作...',
							tags: ['node.js', 'iis', 'httpserver', 'iisnode'],
							votes: 4,
							answers: 0,
							views: 43
						}, {
							title: '當遷移 c++ 的共享程式庫到 python 時遇到 "unexpected reloc type 0xe7"',
							body: '我有一個 C++ 的程式庫，我想把它遷移到 Python 處， 我不肯定我是否知道 C++ 程式庫怎樣運作，我的程式是連結到 link_dir/mylib 的，但實際上它卻需要其他文檔柜內的文檔...',
							tags: ['c++', 'gcc', 'linker', 'cmake', 'shared-libraries'],
							votes: 1,
							answers: 0,
							views: 101
						}, {
							title: '一個 group by 最多有多少個註解',
							body: '我想計算每個 (b,c) 群組的最高 "a_priority"，a_pritiy 是一個基於 case/when 對照的文串值註解...',
							tags: ['python', 'django'],
							votes: 4,
							answers: 1,
							views: 115
						}];
					break;

				case 'hot':

					questions = [{
						title: '甚麼是 NullPointerException？我又怎樣可以修復它？',
						body: '甚麼是 NullPointerException？怎樣引起的？有甚麼方法或工具可以找出引起的原因？',
						tags: ['java', 'nullpointerexception'],
						votes: 211,
						answers: 12,
						views: 1112323
					}, {
						title: 'RegEx 匹配 open tags 除了 XHTML 的 self-contained tags',
						body: '我需要匹配所有這類的 open tags 如 "<p> <a href="foo"> 等，但不是這些 "<br /> <hr class="foo" />，我用了這方法但不知道是否正確...',
						tags: ['html', 'regex', 'xhtml'],
						votes: 1326,
						answers: 35,
						views: 1723233
					}, {
						title: '我在 PHP 內怎樣能避免 SQL Injection？',
						body: '若用戶的輸入沒有經過修飾而直接放到 SQL query 裡，程式便會可能會受到 SQL Infection 攻擊，例如以下的例子...',
						tags: ['php', 'mysql', 'sql', 'security', 'sql-injection'],
						votes: 2786,
						answers: 28,
						views: 1012323
					}, {
						title: '如何制造那偉大的 R reproducible 例子？',
						body: '當與同事討論效能時，或在授課時，或在提交錯誤報告時，往往要提供一個能重複案件的例子...',
						tags: ['r', 'r-faq'],
						votes: 1578,
						answers: 21,
						views: 125232
					}];

					break;

				case 'latest':

					questions = [{
						title: '當讀到一個 "", (), 等等時，Android HTTP Link 便會停止',
						body: '我嘗試以字串發送用戶指引到實時的侍服器時，這些附號卻不能傳送，有沒有方法如何能令 Android 讀到這些附號呢？ ...',
						tags: ['php', 'android', 'json'],
						votes: 0,
						answers: 0,
						views: 2
					}, {
						title: '在 Kendo MVC DatePicker 內加按鍵',
						body: '以下我有要個 Kendo MVC 的 DatePicker，它會生成一個 textbox 和一個按鍵（有日曆圖標），在內它會引發 date picker UI，我的情形是我需要加進一個按鍵...',
						tags: ['asp.net-mvc', 'html5', 'kendo-ui', 'kendo-asp.net-mvc'],
						votes: 0,
						answers: 0,
						views: 2
					}, {
						title: '由後台轉換 $#174; 到前台注冊了的附號',
						body: '我正由後台（Java）接收 json 含有 Ramasamy &#174; Kanna，我想在前台把它轉換成 Ramasamy Kenna，需要怎樣轉換呢？請提供一些...',
						tags: ['javascript', 'java', 'json'],
						votes: 0,
						answers: 0,
						views: 3
					}, {
						title: '拿 DISTINCT 名',
						body: '我正嘗試在我的列表上用 DISTINCT，但我似乎做錯了一點東西，因我拿不到，我需要怎樣才能...',
						tags: ['c#', 'linq', 'distinct'],
						votes: 0,
						answers: 0,
						views: 2
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

		genUsers: function (numOfUsers) {
			return $http.get('https://api.randomuser.me/?results=' + numOfUsers);
		},

		getReputation: function () {

			return Math.round(Math.random() * 2000);
		},

		getNumOfBadges: function () {
			var bronze = Math.round(Math.random() * 100);
			var silver = Math.round(Math.random() * bronze / 10);
			var gold = Math.round(Math.random() * silver);
			return {
				gold: gold,
				silver: silver,
				bronze: bronze
			}
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

		},

		loadUser: function (user) {
			var loadedUser = {
				username: user.login.username,
				name: {
					first: user.name.first,
					last: user.name.last
				},
				avatar: user.picture.thumbnail,
				avatarLarge: user.picture.large,
				jobTitle: 'CTO',
				company: 'JDB Holdings Ltd.',
				email: user.email,
				reputation: this.getReputation(),
				numOfBadges: this.getNumOfBadges(),
				city: '香港',
				selfDesc: '<p>我是 <a href="http://www.jobsdb.com">JobsDB.com</a> <b>偉大創辦人兼前首席科技總監</b>的繼承人。</p><p>在我在任期間，我把 JobsDB.com 的系統成功改寫為以 AngularJS 為前端及以 Sails.js 為後端的系統。</p>' 
			};
			return loadedUser;
		},

		setTagSet: function () {
			return ['actionscript-3', 'ajax', 'algorithm', 'android', 'android-layout', 'angularjs', 'apache', 'api', 'arrays', 'asp.net', 'asp.net-mvc', 'bash', 'c', 'c++', 'c#', 'class', 'codeigniter', 'cordova', 'css', 'css3', 'database', 'date', 'django', 'eclipse', 'email', 'entity-framework', 'excel', 'excel-vba', 'facebook', 'file', 'forms', 'function', 'git', 'google-chrome', 'google-maps', 'hibernate', '.htaccess', 'htlm', 'html5', 'image', 'ios', 'iphone', 'java', 'javascript', 'jquery', 'json', 'jsp', 'laravel', 'linq', 'linux', 'list', 'loops', 'matlab', 'maven', 'mongodb', 'multithreading', 'mysql', '.net', 'node.js', 'objective-c', 'oracle', 'osx', 'performance', 'perl', 'php', 'postgresql', 'powershell', 'python', 'python-2.7', 'python-3.x', 'qt', 'r', 'regex', 'rest', 'rub-on-rails', 'ruby', 'ruby-on-rails-3', 'scala', 'shell', 'spring', 'sockets', 'sorting', 'sql', 'sql-server', 'sql-server-2008', 'sqlite', 'string', 'swift', 'swing', 'symfony2', 'tsql', 'twitter-bootstrap', 'uitabieview', 'unit-testing', 'validation', 'vb.net', 'vba', 'visual-studio', 'visual-studio-2010', 'wcf', 'web-services', 'windows', 'winforms', 'wordpress', 'wpf', 'xami', 'xcode', 'xml']
		},

		loadTags: function () {
			return [{
				name: 'javascript',
				numOfQuestions: 125795,
				desc: 'Javascript（不要與 Java 混亂了）是一個給網頁前端、及後端開發的動態的、弱的類型語言...'
			}, {
				name: 'java',
				numOfQuestions: 1163097,
				desc: 'Java（不要與 Javascript 或 jscript 混亂了）是一個一般用途的以物為本的開發語言...'
			}, {
				name: 'c#',
				numOfQuestions: 1022709,
				desc: '一個多用途、管理的、安全類型的、以物為本的開發語言...'
			}, {
				name: 'php',
				numOfQuestions: 996928,
				desc: '一個在待服器上的多用途腳本語言，原旨在網頁上的開發...'
			}, {
				name: 'javascript',
				numOfQuestions: 125795,
				desc: 'Javascript（不要與 Java 混亂了）是一個給網頁前端、及後端開發的動態的、弱的類型語言...'
			}, {
				name: 'java',
				numOfQuestions: 1163097,
				desc: 'Java（不要與 Javascript 或 jscript 混亂了）是一個一般用途的以物為本的開發語言...'
			}, {
				name: 'c#',
				numOfQuestions: 1022709,
				desc: '一個多用途、管理的、安全類型的、以物為本的開發語言...'
			}, {
				name: 'php',
				numOfQuestions: 996928,
				desc: '一個在待服器上的多用途腳本語言，原旨在網頁上的開發...'
			}, {
				name: 'javascript',
				numOfQuestions: 125795,
				desc: 'Javascript（不要與 Java 混亂了）是一個給網頁前端、及後端開發的動態的、弱的類型語言...'
			}, {
				name: 'java',
				numOfQuestions: 1163097,
				desc: 'Java（不要與 Javascript 或 jscript 混亂了）是一個一般用途的以物為本的開發語言...'
			}, {
				name: 'c#',
				numOfQuestions: 1022709,
				desc: '一個多用途、管理的、安全類型的、以物為本的開發語言...'
			}, {
				name: 'php',
				numOfQuestions: 996928,
				desc: '一個在待服器上的多用途腳本語言，原旨在網頁上的開發...'
			}]
		},

		getTabInfo: function () {
			return {
				name: 'javascript',
				desc: 'Javascript（不要與 Java 混亂了）是一個給網頁前端、及後端開發的動態的、弱的類型語言。 這標籤適用於 ECMAScript 和一些其他的變種，除了 ActionScript 和 Google-Apps-Script。 除非有另一個標籤...'
			}
		},

		loadTagQuestions: function (tagName) {
			return {
				name: tagName,
				desc: 'Javascript（不要與 Java 混亂了）是一個給網頁前端、及後端開發的動態的、弱的類型語言。 這標籤適用於 ECMAScript 和一些其他的變種，除了 ActionScript 和 Google-Apps-Script。 除非有另一個標籤...',
				questions: [{
					title: 'Sonarqube 不顯示 Icov 文檔的覆蓋率',
					body: 'body....body...',
					tags: ['javascript', 'angularjs'],
					votes: 111,
					answers: 111,
					views: 111
				}]
			}
		}

	}

})