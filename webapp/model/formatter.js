sap.ui.define([], function () {
	"use strict";
	return {
        setGrade: function (iScore) {
            // iScore;
            if (iScore > 80 && iScore <= 100) {
                return 'A'
            } else if (iScore > 60 && iScore <= 80) { // 80 >= iScore > 60 'B'
                return 'B'
            } else if (iScore > 40 && iScore <= 60) { // 60 >= iScore > 40 'C'
                return 'C'
            } else {
                return 'Every Day Study'
            }
        },
	};
});