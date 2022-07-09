sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    // "sap/ui/core/mvc/Controller",
    "sap/sync/ui5training/controller/BaseController",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/ui/model/json/JSONModel",
    "../model/formatter", // ../ <- 상위폴더

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Filter, FilterOperator, Sorter, Fragment,Dialog,History,UIComponent) { // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return BaseController.extend("sap.sync.ui5training.controller.View2", {

            onInit: function () {  
                var oViewData = {
                    htmlContent : '<iframe width="560" height="315" src="https://www.youtube.com/embed/cvTbGz1j7Iw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                };
                var oViewModel = new JSONModel(oViewData);
                this.getView().setModel(oViewModel);
                
                var oRouter = this.getRouter();
                oRouter.getRoute("RouteView2").attachMatched(this.
                _onRouteMatched,this); //여기서 괄호안에있는건 함수명임
                //이 화면에 들어올때마다 this.onRouteMatched 함수가 실행됨
                //xml change = "함수명", contorller에선 함수명 : function(oEvent) {oEvent ...}
       
        },
        _onRouteMatched : function(oEvent) {// 이벤트로 실행이 되기때문에 프레임 워크 설꼐상 이벤트 객체가 자동으로 들어감
            //matched의 이벤트 객체 oEvent로 이름지어서 사용
            console.log(oEvent)
            console.log(oEvent.getParameter("arguments"))
            var oArg = oEvent.getParameter("arguments"); //matched이벤트 객체의 파라미터 중 arguments를 읽어올뿐
            var sName = oArg.name;

            this.getView().byId("displayParam").setText(sName);
            //직전화면에서 전달한 파라미터를 읽어옴
            // console.log(sName);
            // console.log("Matched!");
        },

        // getRouter : function () {
        //     return UIComponent.getRouterFor(this);
        // },

        onNavBack: function () {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance(); //ui5 프레임워크 라우터의 기록
            sPreviousHash = oHistory.getPreviousHash(); //내가 첫화면인지 체크하려고

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
                //window 브라우저의 최상단 객체(화면), 브라우저의 뒤로가기
                //브라우저의 기능(ui5 x)
            } else { //내가 첫화면일 경우, 새로고침, uri 직접입력
                this.getRouter().navTo("RouteView1", {}, true);
            }
        },
        onNavToView3: function () {

            // var sName = oViewModel.getProperty(sPath);
            this.getRouter().navTo("kj3", {name:"page3"});

        }

        });
    });