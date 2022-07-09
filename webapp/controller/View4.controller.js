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
    "sap/m/MessageToast"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Filter, FilterOperator, Sorter, Fragment,Dialog,History,UIComponent,MessageToast) { // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return BaseController.extend("sap.sync.ui5training.controller.View4", {

            onInit: function () {
            var oData = {
                orders: [
                    {orderNum : "001", product : "🌂우산", price : "3000", warehouse : "A창고", customer : "삼성"},
                    {orderNum : "005", product : "💨바람", price : "15500" , warehouse : "B창고", customer : "LG"},
                    {orderNum : "007", product : "💟내마음", price : "1460000", warehouse : "C창고", customer : "지은"},
                    {orderNum : "000", product : "🚈트럭같은거", price : "175000", warehouse : "D창고", customer : "현대"},
                    {orderNum : "003", product : "✈비행기", price : "25000", warehouse : "E창고", customer : "kbs"},
                    {orderNum : "006", product : "🌈무지개", price : "10000", warehouse : "F창고", customer : "jtbc"}
                ],
                customers : [
                    {
                        customerName : "지은", contract : "010-3052-5359", email : "jiizy96@naver.com",address : "광교", post : "0022"
                    },{
                        customerName : "현대", contract : "010-8980-0161", email : "캬캬캬@naver.com",address : "광교", post : "0022"
                    },{
                        customerName : "지은", contract : "010-3052-5359", email : "jiizy96@naver.com",address : "광교", post : "0022"
                    }
                ],


            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            var oRouter = this.getRouter();
            oRouter.getRoute("RouteView4").attachMatched(this.
                _onRouteMatched.bind(this));
            },
            _onRouteMatched: function(oEvent) {
                this.getView().setBusy(false);
                var oArg = oEvent.getParameter("arguments");
                var sOrderNum = oArg.order;

                var oModel = this.getView().getModel();
                var aOrderData = oModel.getProperty("/orders");
                var aCustomerData = oModel.getProperty("/customers");
                var sCustomerName = "";

                for(var i=0; i<aOrderData.length; i++) {
                    if(aOrderData[i].orderNum === sOrderNum){//내가 지금 화면으로 넘어올때 전달받은 주문번호가 실제 데이터안에서 그 주문건의 고객정보를 읽어오기
                        sCustomerName = aOrderData[i].customer;
                        //실제 데이터안에서 그 주문건의 고객정보를 읽어오기

                        for (var j=0; j<aCustomerData.length; j++){
                            if(sCustomerName === aCustomerData[j].customerName) {
                                oModel.setProperty("/customer",aCustomerData[j]);
                                break;
                            }
                        }

                        i = aOrderData.length; //for문 중단시키기, 한번 찾았으면 더이상 반복할 필요없음
                        break; //반복문 실행중단!
                    }
                    if (i === aOrderData.length-1){
                        MessageToast.show("주문번호가 잘못되었습니다.")
                    }
                }
                // console.log(oModel.getProperty("/customer"))
                
            
            }

            


       
    

        });
    });