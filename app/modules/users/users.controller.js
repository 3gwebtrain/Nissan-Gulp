(function( ){
	"use strict";

	angular.module("blog.controllers", [ "blog.services" ])
	.controller("User.controller", function(  userService  ) {

		var userlist = this;
		userlist.name = "Nissan New Japan!!";
		console.log( "user controller ready!!");

		console.log("from userService  post : " , userService .name( ) );
		return userlist;
	});
})( );