sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    // "sap/ui/core/mvc/Controller",
    "sap/sync/ui5training/controller/BaseController",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/ui/model/json/JSONModel",
    "../model/formatter", // ../ <- 상위폴더

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter",
    "sap/m/Input",
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Filter, FilterOperator,Fragment,Dialog,History,UIComponent,MessageToast,Sorter,Input) { // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return BaseController.extend("sap.sync.ui5training.controller.View3", {

            bState : "ture",
            onInit: function () {  
                var oData = {
                    orders: [
                        {orderNum : "001", product : "🌂우산", price : "3000", warehouse : "A창고"},
                        {orderNum : "005", product : "💨바람", price : "15500" , warehouse : "B창고"},
                        {orderNum : "007", product : "💟내마음", price : "1460000", warehouse : "C창고"},
                        {orderNum : "000", product : "🚈트럭같은거", price : "175000", warehouse : "D창고"},
                        {orderNum : "003", product : "✈비행기", price : "25000", warehouse : "E창고"},
                        {orderNum : "006", product : "🌈무지개", price : "10000", warehouse : "F창고"}
                    ],
                    searchValue : "",
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
                
           
        },
        
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        onNavToView4: function () {
            var oTable = this.getView().byId("table");
            // var iIndex = oTable.ge;
            var value = oTable.getColumns();
            console.log(value);
            // var oViewModel = this.getView().getModel();
            // var sPath = "/orders/"+iIndex+"/orderNum"; //students/0/name
            // var sName = oViewModel.getProperty(sPath);
            // this.getRouter().navTo("RouteView4");
            
           
        },
        // var oRouter = this.getRouter();
        //         oRouter.getRoute("goview3").attachMatched(this._onRouteMatched.bind(this));

        // _onRouteMatched: function(oEvent) {

        //     this.getView().setBusy(false);

        // },
        //
        onPressItem: function(oEvent) {
            // console.log(oEvent.getSource());
            // var isSelected = this.getView().byId("cl").getSelected();
            // console.log("ss", isSelected)
            var oModel = this.getView().getModel();

            //내가 누른 행(인덱스)의 경로 ex) '/orders/0'
            var sPath = oEvent.getSource().getBindingContextPath();
            var oRowData = oModel.getProperty(sPath);
            // var oSelected = this.geView().
             
            var sProduct = oRowData.product;
            var ssProduct = oRowData.warehouse;
            var sOrderNum = oRowData.orderNum;

            var oParam = {
                order : sOrderNum
            };
            
            // ...이거 보여주는거
            this.getView().setBusy(true);
            this.getRouter().navTo("RouteView4",oParam);
            
            MessageToast.show(ssProduct);
            // 메세지토스트로 상품명 띄워주기
            // view1{name : } -> sProduct
        },
        //내가한거
        // onSearch1 : function () {
        //     var oModel = this.getView().getModel(); // JSONModel
        //     var sSearchText = oModel.getProperty("/searchValue"); //모델에서 프로퍼티 값을 받아옴

        //     var oTable = this.getView().byId("table");    // ui.table
        //     var oBinding = oTable.getBinding("items");  // ui.table의 바인딩 정보 --> 필터 적용대상

        //     var aFilter = [];


        //     // ------------------------------------------------------------- 선언부

        //     var oFilterObject = {
        //         path: "orderNum",
        //         operator: FilterOperator.Contains,
        //         value1: sSearchText

        //     }

        //     var oFilterObject2 = {
        //         path: "product",
        //         operator: FilterOperator.Contains,
        //         value1: sSearchText
        //     }

        //     var oFilterObject3 = {
        //         path: "price",
        //         operator: FilterOperator.Contains,
        //         value1: sSearchText
        //     }

        //     var oSearchFilter = new Filter(oFilterObject);  // 필터 생성
        //     aFilter.push(oSearchFilter);    // index 0(첫번째 위치) 속성값으로 넣어줌
        //     oBinding.filter(aFilter);

        //     var oSearchFilter2 = new Filter(oFilterObject2);  // 필터 생성
        //     aFilter.push(oSearchFilter2);    // index 0(첫번째 위치) 속성값으로 넣어줌
        //     oBinding.filter(aFilter);

        //     var oSearchFilter3 = new Filter(oFilterObject3);  // 필터 생성
        //     aFilter.push(oSearchFilter3);    // index 0(첫번째 위치) 속성값으로 넣어줌
        //     oBinding.filter(aFilter);


        // },

        //쌤이해준 onsearch 멀티 다중버튼 필터 만들기
        onSearch : function() {
            var oInput = this.getView().byId("searchInput"),
                sValue = oInput.getValue(),
                oTable = this.getView().byId("table"),
                oBinding = oTable.getBinding("items"),
                aFilter = [];

                //필터만들기
            var oSearchNumFilter = new Filter({
                path : "orderNum", 
                operator : FilterOperator.Contains, 
                value1 : sValue
            });

            var oSearchProductFilter = new Filter({
                path : "product", 
                operator : FilterOperator.Contains, 
                value1 : sValue
            });

            aFilter.push(oSearchNumFilter);
            aFilter.push(oSearchProductFilter);

            var aFilters = new Filter(aFilter); //필터를 담은 배열객체를 필터로 전환
            oBinding.filter(aFilters);
        },

        onViewSetting : function() {
            this._openDialog();
        },
        handleConfirm : function(oEvent) {
            //viewSettingDialog 의 컨펌 이벤트 파라미터로 사용자의 설정값을 받아옴
          var sSortPath = oEvent.getParameter("sortItem").getKey();
          console.log(sSortPath);
          var bDesc = oEvent.getParameter("sortDescending");
          var sGroupPath = oEvent.getParameter("groupItem").getKey();
          var bGroupDesc = oEvent.getParameter("groupDescending");
          var oTable = this.getView().byId("table");
          var oModel = oTable.getBinding("items");
          
          var oSorter = new Sorter(sSortPath, bDesc, function(oContext) {
            var name = oContext.getProperty(sGroupPath);
            return {
                key: name,
                text :name
            };
        });
        console.log("sorted", oSorter);
        oModel.sort(oSorter); //테이블에 반영
          
        },

        _openDialog : function (sPage, fInit) {
            var oView = this.getView();

            // creates requested dialog if not yet created
            if (!this._mDialogs) {
                this._mDialogs = Fragment.load({
                    id: oView.getId(),
                    name: "sap.sync.ui5training.view.Dialog",
                    controller: this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);
                    if (fInit) {
                        fInit(oDialog);
                    }
                    // console.log("odialog", oDialog)
                    return oDialog;
                });
            }
            this._mDialogs.then(function(oDialog){
                // opens the requested dialog
                oDialog.open(sPage);
            });
        },

        //잘못된 정보를 쳣을때 반응 같은거 빨간색으로뜨고 그런거 input.check
        onCheck : function(oEvent) {
            var oButton = oEvent.getSource(); //->이벤트의 발생지는 버튼이라는 소리임
            var oInput1 = this.getView().byId("input1");
            var oInput2 = this.getView().byId("input2");
            var oInput3 = this.getView().byId("input3");
            var sValue1 = oInput1.getValue();
            var sValue2 = oInput2.getValue();
            var sValue3 = oInput3.getValue();

            //다른방법임 체크대상 인풋창id목록
            //방법 2.
            var aInputIds = ["input1", "input2", "input3"];
            var iLength = aInputIds.length; //배열의 길이
            // for(var i = 0; iLength; i++){
            //     var sId = aInputIds[i]; //배열에서 id를 하나씩 꺼내옴
            //     var oInput = this.getView().byId(sId);
            //     var sValue = oInput.getValue();

            //     if (this.bState && oInput.getRequired() && sValue.length === ""){//input에 setvaluestatement에 에러넣으면돼
            //         oInput.setValueState("Error")
            //         oInput.setValueStateText("필수값임")
            //     } else  {
            //         oInput.setValueState("None");
            //     }
                
            // }
            //배열을 뒤지면서 내부 펑션을 배열 요소 개수만큼(index위치에 element와 index가 바뀌면서) 수행


            //방법 3.
            var that = this; //that도 컨트롤러라는 객체 펑션에 펑션을 쓸때
            // aInputIds.forEach(function (element, index){
            //     var sId = element; //배열에서 id를 하나씩 꺼내옴
            //         var oInput = that.getView().byId(sId);
            //         var sValue = oInput.getValue();
    
            //         if (that.bState && oInput.getRequired() && sValue === ""){//input에 setvaluestatement에 에러넣으면돼
            //             oInput.setValueState("Error")
            //             oInput.setValueStateText("필수값임")
            //         } else  {
            //             oInput.setValueState("None");
            //         }
            //     }.bind(this)); //2) .bind(this) this scope를 맞춰줌
                //*foreach 사용시 주의할 점 (순차함수가 아님!!)
                //사이클을 다 안돌고 아래 코드를 실행시킬 경우가 있음

            //방법4.
                var oBox = this.getView().byId("box1");
                oBox.getItems().forEach(function(element){ //박스안의 아이템을 하나씩 체크
                    // console.log(element instanceof Input);// instanceof는 그냥 typeof 같은거임 왼쪽이 오른쪽으로부터 만들어진 인스턴스인지 불린값으로 체크, 친자검증
    
                    if (element instanceof Input){//input에 setvaluestatement에 에러넣으면돼
                        //input으로 만든 인스턴스만 필수값 체크로직을 타도록 걸러주는 역할
                        var oInput = element; //this.getView byId(sId)
                        var sValue = oInput.getValue();
                        if(that.bState && oInput.getRequired() && sValue === ""){
                            oInput.setValueState("Error");
                            oInput.setValueStateText("필수값임")
                        } else  {
                        oInput.setValueState("None");
                        }
                    }
                })


                //방법5.
                // try{ //조건) 여기서 에러가 발생하면 catch 에서 실행
                //         var oInput = element; //this.getView byId(sId)
                //         var sValue = oInput.getValue();

                //         if(that.bState && oInput.getRequired() && sValue === ""){
                //             oInput.setValueState("Error");
                //             oInput.setValueStateText("필수값임")
                //         } else  {
                //         oInput.setValueState("None");
                //         }
                //         } catch(error) {//에러가 발생하면 실행 - 조건이 에러발생시
                //         console.log(error);

                //     } finally {
                //         //생략가능
                //     }
                // }

                // });
          
            //방법 1.
            //validation check 입력값 검증??
            // if (this.bState && oInput1.getRequired() && sValue1.length < 2){//input에 setvaluestatement에 에러넣으면돼
            //     oInput1.setValueState("Error")
            //     oInput1.setValueStateText("필수값임")
            // } else  {
            //     oInput1.setValueState("None");
            // }
            // if (this.bState && oInput2.getRequired() && sValue2.length < 2){//input에 setvaluestatement에 에러넣으면돼
            //     oInput2.setValueState("Error")
            //     oInput2.setValueStateText("필수값임")
            // } else  {
            //     oInput2.setValueState("None");
            // }
            // if (this.bState && oInput3.getRequired() && sValue3.length < 2){//input에 setvaluestatement에 에러넣으면돼
            //     oInput3.setValueState("Error")
            //     oInput3.setValueStateText("필수값임")
            // } else  {
            //     oInput3.setValueState("None");
            // }
            // this.bState = !this.bState;


            if (this.bState){
                oButton.setText("초기화");
            }else {
                oButton.setText("제출");
            }
            this.bState = !this.bState;
        }



            // //방법 2
            // if (this.bState && oInput.getRequired() && sValue.length ===0){//input에 setvaluestatement에 에러넣으면돼
            //     oInput.setValueState("Error")
            //     oInput.setValueStateText("필수값임")
            // } else  {
            //     oInput.setValueState("None");
            // };
            // this.bState = !this.bState;

        


        });
    });