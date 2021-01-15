const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:4000',
       options : {
	   'sonar.login': 'admin',
	   'sonar.password': '#Kuna2121',
       'sonar.sources': '.',
       'sonar.inclusions' : 'src/**' // Entry point of your code
       }
     }, () => {});