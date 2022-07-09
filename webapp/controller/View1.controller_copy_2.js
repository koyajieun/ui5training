sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    // "sap/ui/core/mvc/Controller",
    "sap/ui/core/mvc/Controller",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/ui/model/json/JSONModel",
    "../model/formatter", // ../ <- 상위폴더

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/m/Dialog"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, formatter, Filter, FilterOperator, Sorter, Fragment,Dialog) { // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return Controller.extend("sap.sync.ui5training.controller.js", {

            onInit: function () {
//{이게 바로 프로퍼티 바인딩}
                var oViewData = {
                    sValue1 : "", //string type var 변수명
                    sValue2 : "",
                    sResult : "",
                    dateString : "",
                    results : [
                        {string :"1"},{string : "2"},{string : "3"},{string :"4"},
                        {string :"5"},{string : "6"},{string : "7"},{string :"8"},{string :"9"}
                    ]
                };
                var oViewModel = new JSONModel(oViewData);
                this.getView().setModel(oViewModel);
            
            },
            onTestModel : function () {
                var oViewModel = this.getView().getModel();
                var sInputValue1 = oViewModel.getProperty("/sValue1"),
                    sInputValue2 = oViewModel.getProperty("/sValue2")

                var iNum1 = parseInt(sInputValue1),
                    iNum2 = parseInt(sInputValue2);  
                    
                var sRlt = "";
                if (iNum1 === iNum2) {
                    sRlt = "="
                } else if (iNum1 > iNum2) {
                    sRlt = ">"
                } else if (iNum1 < iNum2) {
                    sRlt = "<"
                }
                oViewModel.setProperty("/sResult",sRlt)
            },

            onTest: function(){
                
                var oInput1 = this.getView().byId("input1");
                var oInput2 = this.getView().byId("input2");
                var oInput3 = this.getView().byId("input3");
                var iValue1 = oInput1.getValue();
                var iValue2 = oInput2.getValue();
                var iValueL1 = oInput1.getValue().length;
                var iValueL2 = oInput2.getValue().length;

                var iNum1 = parseInt(iValue1),
                    iNum2 = parseInt(iValue2);

                var sResult = "";

                if (iNum1 === iNum2){
                    sResult = "=";
                } else if(iNum1 > iNum2) {
                    sResult = ">";
                } else if(iNum1 < iNum2) {
                    sResult = "<";
                }

                //5(마지막) - 결과반영
                oInput3.setValue(sResult);
            },

            onDateChange: function(oEvent) {
        
                var oViewModel = this.getView().getModel();
                var oDatePicker = oEvent.getSource(),
                    oDate = oDatePicker.getDateValue(); //date형식의 값을 추출

                var sDate = oDate.getFullYear() + "-" + (oDate.getMonth() + 1) + "-" + oDate.getDate();
                
                
                oViewModel.setProperty("/dateString", sDate);
            },

            onMulti : function(){
                var iNum = parseInt(this.getView().getModel().getProperty("/sValue1"));
                var oViewModel = this.getView().getModel();
                var aResults = [];
                var str = (this.getView().getModel().getProperty("/sValue1"));

                //results 안의 index 0인 하위 프로퍼티 값에 1단 결과를 넣어줌
                var iResult = iNum * 1;
                
                var sStr = iNum + "x" + 1 +"=" + iResult;

                // oViewModel.setProperty("/results/0/string",sStr); 
                
                for(var i = 1; i <= 9; i++) {
                    var sStr="";
                    var jMax = (i > 5) ? (10 - i) : i;

                    if(i >= iNum) {
                        // jMax = (iNum - (i - iNum)); 1보다 작아지면 값을 1로 넣어줘야함
                        jMax = (iNum - (i-iNum)) > 0 ? (2*iNum - i) : 1;
                    }else {
                        jMax = i;
                    }

                    for(var j=1; j<=jMax; j++) {
                        sStr = sStr + "*";
                    }


                //     var iResult = iNum * i;
                //     var sStr = iNum + "x" +i+ "="+ iResult;

                    var sPath = "/results/" + (i-1) + "/string";
                    oViewModel.setProperty(sPath,sStr)
                    // oViewModel.setProperty("/results/o/string",sStr)
                    // aResults.push(sStr);
                }
                // console.log(aResults);  
            }

        });
    });
