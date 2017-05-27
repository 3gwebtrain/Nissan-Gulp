(function( ){

	"use strict";
	angular.module("blog.services", [])
	.service("userService", function( ) {

		console.log("service called");

		this.name = function( ) {
			// return $resource(BaseUrl + ‘/posts/:postId’, { postId: ‘@_id’ });
			return "Tech Mahindra";
		}

	})

	
})( );