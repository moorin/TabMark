//체크박스에 체크된 url을 storage에 저장
//1. 체크박스에 체크된 url 식별
//2. 식별된 url을 storage에 저장

// var strURL = [];                //storage에 저장되는 영구저장 URL
// var strTitle = [];              //storage에 저장되는 영구저장 title

function clickhandler(e){
    
    var storeURL = [];          //버튼 누를 때마다 배열 초기화
    var storeTitle = [];        //버튼 누를 때마다 배열 초기화
    var chkbox = document.querySelectorAll("#list input[type='checkbox']:checked"); //체크박스에 체크된 것들만 가져오기
    
    chrome.storage.sync.get(['title', 'url'], function(result){         //storage에 저장되어있는 정보가 있다면 strURL, strTitle에 복사
        if(typeof result.title === 'undefined'){
            console.log("get function returns null\n");
        }
        else{
            console.log("get storage in SAVE.js\n");
            for(var i=0; i<result.title.length; i++){
                storeURL.push(result.url[i]);             
                storeTitle.push(result.title[i]);
                console.log(result.title[i]+"\n");
                // strURL.push(result.url[i]);
                // strTitle.push(result.title[i]);
            }
        }

    });
    for(var i=0; i<chkbox.length; i++){                                             //체크박스 체크된 개수만큼 반복
        storeURL.push(listURL[chkbox[i].value]);                //선택한 탭의 url을 임시배열에 저장
        storeTitle.push(listTitle[chkbox[i].value]);            //선택한 탭의 title을 임시배열에 저장
        // strURL.push(storeURL[i]);                               //임시배열 내용을 영구저장 배열에 복사
        // strTitle.push(storeTitle[i]);                           //임시배열 내용을 영구저장 배열에 복사
    }
    chrome.storage.sync.set({'url': storeURL, 'title' : storeTitle},           //영구저장 배열로 크롬 storage에 선택한 탭의 url과 title 저장
    function(){ 
        if(chrome.runtime.error){                       //에러처리
            console.log("Runtime Error.");
        }
        console.log("storeTitle length : "+storeTitle.length);
        console.log("set storage in SAVE.js\n"+storeTitle);
        });
    
    }
    //storage에 있는 모든 데이터 삭제
    //  chrome.storage.sync.clear(function(){
    //      var error = chrome.runtime.lasterror;
    //      if(error){
    //          console.error(error);
    //      }
    //  });


document.getElementById("save").addEventListener("click", clickhandler);            //저장하기 버튼을 누르면 이벤트 동작



