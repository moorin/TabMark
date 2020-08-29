//체크박스에 체크된 url을 storage에 저장
//1. 체크박스에 체크된 url 식별
//2. 식별된 url을 storage에 저장
var strURL = [];                //storage에 저장되는 영구저장 URL
var strTitle = [];              //storage에 저장되는 영구저장 title

function clickhandler(e){
    var storeURL = [];          //버튼 누를 때마다 배열 초기화
    var storeTitle = [];        //버튼 누를 때마다 배열 초기화
    var chkbox = document.querySelectorAll("#list input[type='checkbox']:checked"); //체크박스에 체크된 것들만 가져오기
    for(var i=0; i<chkbox.length; i++){                                             //체크박스 체크된 개수만큼 반복
        storeURL.push(listURL[chkbox[i].value]);                //선택한 탭의 url을 임시배열에 저장
        storeTitle.push(listTitle[chkbox[i].value]);            //선택한 탭의 title을 임시배열에 저장
        strURL.push(storeURL[i]);                               //임시배열 내용을 영구저장 배열에 복사
        strTitle.push(storeTitle[i]);                           //임시배열 내용을 영구저장 배열에 복사
    }
    chrome.storage.sync.set({"url" : strURL, "title" : strTitle},           //영구저장 배열로 크롬 storage에 선택한 탭의 url과 title 저장
        function(){ 
            if(chrome.runtime.error){                       //에러처리
                console.log("Runtime Error.");
            }
        });
}

document.getElementById("save").addEventListener("click", clickhandler);            //저장하기 버튼을 누르면 이벤트 동작



