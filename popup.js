var allTabTitles = [];
var tabs_length = [];
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
        //console.log(currnetWindowTabTitles);
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

//저장한 날짜, 시간 > 저장할 이름 > 탭 제목들


// 저장하기
/*
탭의 제목
탭의 URL
탭의 길이
몇번째 저장인지

list 1개
네이버, 깃허브

list 2개 이상
새탭, 안녕하세요

1: 네이버, 깃허브
2: 새탭, 안녕하세요

불러오기
*/
function save(curruentTabTitle, currnetWindowTabURLs) {

  //console.log("save test:",curruentTabTitle);
  chrome.storage.sync.get("title", function (items) {

    // 값이 존재한다면
    if("title" in items)
    {
      //제목
      chrome.storage.sync.get("title", function (items) {
        var i = items["title"].length; // ex) 3개 저장, index 0,1,2, length 3, 

        for(var j=0; j<curruentTabTitle.length; j++) {
          items["title"][i] = curruentTabTitle[j];
          console.log("save test2: ",items["title"][i]);
          i++;
        }

        chrome.storage.sync.set({title: items["title"]}, function () {
          console.log("Value is set to " + items["title"]);
        });
        
      });

      //url
      chrome.storage.sync.get("url", function (items) {
        var i = items["url"].length;

        for(var j=0; j<currnetWindowTabURLs.length; j++) {
          items["url"][i] = currnetWindowTabURLs[j];
          i++;
        }
        chrome.storage.sync.set({url: items["url"]}, function () {
          //console.log("Value is set to " + currnetWindowTabURLs);
        });
      });

      //save_count
      chrome.storage.sync.get("save_count", function (items) {
        //현재 탭의 길이
        var i = items["save_count"];
        items["save_count"] = i+1;
        console.log(items["save_count"]);
        chrome.storage.sync.set({save_count: items["save_count"]}, function () {
          //console.log("Value is set to " + curruentTabTitle.length);
        });
      });

      //tabs_length
      chrome.storage.sync.get("tabs_length", function (items) {
        
        //현재 탭의 길이
        var i = items["tabs_length"].length;
        items["tabs_length"][i] = curruentTabTitle.length;
        //console.log(items["tabs_length"]);
        chrome.storage.sync.set({tabs_length: items["tabs_length"]}, function () {
          //console.log("Value is set to " + curruentTabTitle.length);
        });
      });
    }
    // 존재하지 않는다면
    else
    {
      chrome.storage.sync.set({title: curruentTabTitle}, function () {
        //console.log("Value is set to " + curruentTabTitle);
      });

      chrome.storage.sync.set({url: currnetWindowTabURLs}, function () {
        //console.log("Value is set to " + currnetWindowTabURLs);
      });

      chrome.storage.sync.set({save_count: 0}, function () {
        //console.log("Value is set to " + curruentTabTitle.length);
      });
      tabs_length.push(curruentTabTitle.length);
      chrome.storage.sync.set({tabs_length: tabs_length}, function () {
        //console.log("Value is set to " + curruentTabTitle.length);
      });
    }
  });
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
  //chrome.storage.sync.clear();
  getUrlAndTitle(false);
  load(false);

  document.getElementsByClassName("popup_save")[0].addEventListener('click', function(){getUrlAndTitle(true);},false);
  document.getElementsByClassName("popup_view_more")[0].addEventListener('click', function(){load(true);},false);

};