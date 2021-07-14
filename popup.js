var allTabTitles = [];


// 현재 윈도우의 모든 탭의 URL, 제목 가져오기
function getUrlAndTitle(saveData){
  
  chrome.windows.getAll({populate:true}, function(window_list){
    // window_list == 각 창들의 리스트, 그러니까 A 창에 3탭, B 창에 2탭
    var currnetWindowTabTitles = [];
    var currnetWindowTabURLs= [];

    for(var i=0; i<window_list.length; i++){
      for(var j=0; j<window_list[i].tabs.length; j++){
        //예를들면 B 창의 탭의 길이 == 2
        currnetWindowTabTitles.push(window_list[i].tabs[j].title);
        currnetWindowTabURLs.push(window_list[i].tabs[j].url);
        console.log(currnetWindowTabTitles);
        // 지금 창의 탭의 n번째의 탭 제목을 저장
        //console.log(window_list[i].tabs[j].url, window_list[i].tabs[j].title);
        
        if(saveData == false)
        {
          // html에 제목 추가
          // html 태그 만들기
          var newLi = document.createElement("li");
          var newInput = document.createElement("input");
          var newSpan = document.createElement("span");
          newInput.type = "checkbox";
          newSpan.className = "tab_title";
          var spanText = document.createTextNode(window_list[i].tabs[j].title);
          newSpan.appendChild(spanText);

          document.getElementById("tab_titles").appendChild(newLi);
          newLi.appendChild(newInput); newLi.appendChild(newSpan);

        }
      }
    }
    if(saveData == true)
    {
        save(currnetWindowTabTitles, currnetWindowTabURLs);
    }
    allTabTitles.push(currnetWindowTabTitles);
    //console.log(allTabTitles);
    
  });
}

/*
저장을 어떻게 할 것인가?
폴더 구조, tree? log(n), list? -> 찾을 때 시간 걸림
개수는 대충? 0.5초 기준으로 1~10만개
일단 list로 만들고 나중에 tree로 변경

저장한 날짜, 시간 > 저장할 이름 > 탭 제목들
*/

// todo 1. js간 변수 공유 2. 두 html에 한 js 했을시 html태그 추가
// 정보를 storage에 저장해놨다가 거기서 꺼내오기
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export



// 저장하기
function save(curruentTabTitle, currnetWindowTabURLs) {
  //그냥 저장

    chrome.storage.sync.set({title: curruentTabTitle}, function () {
        console.log("Value is set to " + curruentTabTitle);
    });

    chrome.storage.sync.set({url: currnetWindowTabURLs}, function () {
      console.log("Value is set to " + currnetWindowTabURLs);
  });

  //변경할 때
/*
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue, //이전값
                    storageChange.newValue);//변경된값
        }
    });
    */
}

//더보기 버튼을 누르면 tabmark.html 창을 새로 띄운다.
function load(loadData){
  if(loadData==true)
  {
    console.log("load test");
    window.open("tabmark.html");
  }
  
}


window.onload = function()
{
  // 새로고침 버튼 만들어야할 듯
  getUrlAndTitle(false);
  load(false);

  document.getElementsByClassName("popup_save")[0].addEventListener('click', function(){getUrlAndTitle(true);},false);
  document.getElementsByClassName("popup_view_more")[0].addEventListener('click', function(){load(true);},false);

};