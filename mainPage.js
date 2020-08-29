function newhandler(e){                                 //버튼 누르면 이벤트 핸들러 동작
    chrome.tabs.create({url : "./mainPage.html"});      //메인 페이지로 이동
}

document.getElementById("main_page").addEventListener("click", newhandler);     //'메인 페이지로 이동' 버튼에 이벤트 리스너 등록