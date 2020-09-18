sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (data) {
			if (data) {
				if (data == "Retired") {
					return "Error";
				} else if (data == "Active") {
					return "Success";
				} else {
					return "None";
				}

			}
		}
	};
});