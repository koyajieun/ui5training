sap.ui.define([ 
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/daumPost",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/m/MessageToast"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator,daumPost,Fragment, Dialog, MessageToast) { 
        "use strict";

        return Controller.extend("sap.sync.ui5training.controller.js", {

            onInit: function () {   
                var oViewData = {
                    students: [
                        {name : "Lee", score1 : "F", score2:"B", result : "", address :""},
                        {name : "Lim", score1 : "A", score2:"A", result : "", address :""},
                        {name : "kim", score1 : "c", score2:"B", result : "", address :""},
                        {name : "Hwang", score1 : "A", score2:"F", result : "", address :""},
                        {name : "Ki", score1 : "B", score2:"B", result : "", address :""},
                        {name : "Jo", score1 : "C", score2:"A", result : "", address :""},
                    ],
                    searchValue: "", // 검색창 프로퍼티 바인딩
                    score1Input : "",
                    score2Input : "",
                    gradeList : [
                        {grade : "A", text: "A"},
                        {grade : "B", text: "B"},
                        {grade : "C", text: "C"},
                        {grade : "F", text: "F"}
                    ],
                    address :""
                    
                };

                var oViewModel = new JSONModel(oViewData);
                this.getView().setModel(oViewModel);
            },

            onSearch: function () {
                var oViewModel = this.getView().getModel(); // JSONModel
                var sSearchText = oViewModel.getProperty("/searchValue"); //모델에서 프로퍼티 값을 받아옴

                var oTable = this.getView().byId("uiTable");    // ui.table
                var oBinding = oTable.getBinding("rows");  // ui.table의 바인딩 정보 --> 필터 적용대상

                var aFilter = [];


                // ------------------------------------------------------------- 선언부

                var oFilterObject = {
                        path: "name",
                        operator: FilterOperator.Contains,
                        value1: sSearchText
                };

                var oSearchFilter = new Filter(oFilterObject);  // 필터 생성
                aFilter.push(oSearchFilter);    // index 0(첫번째 위치) 속성값으로 넣어줌
                oBinding.filter(aFilter);
            },
            
            onCheck: function () {
                // 국어가 B 이상일 때만 "합격" / "불합격"
                // students 하위의 배열을 하나씩 체크하면서 result 프로퍼티를 바꿈

                var oViewModel = this.getView().getModel();
                var ilength = oViewModel.getProperty("/students").length;
                // /students도 배열 객체이기때문에 length라는 프로퍼티를 가지고있음
                // length : js 에서 배열 객체가 가지고 있는 속성값, 배열의 항목 갯수를 Number type으로 가지고 있음

                // for (var i=0; i<7; i++) {

                //     var sPathCheck = "/students/" + i + "/score"  // 체크할 대상  // i가 처음에는 초기값은0이야 0부터 시작해서 근데 변수 i 넣어서 0에서 i로 바꿈
                //     var sPathChange = "/students/" + i + "/result" // 변경할 대상
                //     var sScore1 = oViewModel.getProperty(sPathCheck);

                //     if (sScore1 === 'A' || sScore1 === 'B') {   // B등급 이상
                //         oViewModel.setProperty(sPathChange, "합격");
                //     } else {
                //         oViewModel.setProperty(sPathChange, "불합격");
                //     }


                // for (var i=0; i<7; i++) {
                    for (var i=0; i<ilength; i++){

                    var sPathScore1 = "/students/" + i + "/score1" //체크할 대상
                    var sPathScore2 = "/students/" + i + "/score2"  // 체크할 대상  // i가 처음에는 초기값은0이야 0부터 시작해서 근데 변수 i 넣어서 0에서 i로 바꿈
                    var sPathChange = "/students/" + i + "/result" // 변경할 대상
                    var sScore1 = oViewModel.getProperty(sPathScore1);
                    var sScore2 = oViewModel.getProperty(sPathScore2);

                    if ((sScore1 === 'B' || sScore1 === 'A') && (sScore2 === 'B' || sScore2 === 'A')) {   // B등급 이상
                        oViewModel.setProperty(sPathChange, "합격");
                    } else {
                        oViewModel.setProperty(sPathChange, "불합격");
                    }    

                }


            },
            //학생 추가하게 만들어보기
            onRegist : function() {
                var oInputName = this.getView().byId("nameInput");
                var sName = oInputName.getValue();

                var oViewModel = this.getView().getModel();
                var sScore1 = oViewModel.getProperty("/score1Input");
                var sScore2 = oViewModel.getProperty("/score2Input");
                var aStudents = oViewModel.getProperty("/students");

                //우리는 page와 인풋밖에 모를때
                var oPage = this.getView().byId("page") //가져올 대상의 상위컨텐츠의 아이디만 알 경우 접근방법
                // var oAddressInput = oPage.getContent()[0].getItems()[3].getItems()[1]; //디버그해서 이렇게 찾음
                // var sAddress = oAddressInput.getValue(); //객체에서 메소드로 읽어옴
                // console.log(oPage);


                var sAddress = oViewModel.getProperty("/address"); //모델의 프로퍼티로 읽어옴


                var oPerson = {name : sName, score1:sScore1, score2:sScore2, result:"", address : sAddress};
                aStudents.push(oPerson);

                oViewModel.setProperty("/students", aStudents);

                this.onCloseDialog(); //닫기버튼의 이벤트와 같은 기능을 실행(다이얼로그 닫기)

              
                MessageToast.show("따랑해"); //처리결과를 메스지 토스트로 사용자에게 알려줌

//등록하면 닫게끔 만들어줌
                
               
            },

            //삭제 시키기
            onDelete : function (){
                var oTable = this.getView().byId("uiTable");
                var iIndex = oTable.getSelectedIndices()[0]; //array[몇번쨰 인덱스]
                //single mode

                var oViewModel = this.getView().getModel();
                var aStudents = oViewModel.getProperty("/students"); //테이블 데이터(배열)을 가져와서

                //배열에서 선택한 인덱스 위치의 요소 하나를 삭제(array type - js)
                aStudents.splice(iIndex,1); //시작인덱스, 삭제할 요소 개수
                oViewModel.setProperty("/students", aStudents); //처리(지문) 결과를 모델에 다시 반영

            },


            onPopupAddress : function(oEvent) {
                var oInput = oEvent.getSource(); //인풋창
                new daum.Postcode({
                    oncomplete: function(data) { //컨트롤러에서 oninit과 비슷
                        //내가 처리하고자하는 기능을 여기에 추가
                            var sAddress = data.address; //주소 텍스트
                            oInput.setValue(sAddress); //인풋창에 값 반영
                    }
                }).open();
            },

            onRegistPopup : function() {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name : "sap.sync.ui5training.view.Regist"
                    });
                }

                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                    oDialog.setBusy(true);

                    //js 내장함수 setTimeout([func],지연시간)
                    setTimeout(function(){oDialog.setBusy(false);}, 2000); 
                    //callback비동기처리가 되는 함수
                });
            // daumPostApi : function(_this, postcodeElemId,addressElemId){

        },

        onCloseDialog : function() {
            var oDialog = this.getView().byId("helloDialog");

            oDialog.close();
         },   

        });
    });