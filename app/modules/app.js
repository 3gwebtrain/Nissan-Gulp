(function( ){
	
	"use strict";

	angular.module("blog", ["ngRoute",  "blog.controllers", "blog.services", "blog.templates"  ]);

	function config ($locationProvider, $routeProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider
		.when('/', {
			templateUrl: 'modules/users/views/users-list.tpl.html',
			controller: 'User.controller',
			controllerAs: 'userlist'
		});
	}

	angular
	.module('blog')
	.config(config);

})( );