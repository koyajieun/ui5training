/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapsync/ui5training/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
