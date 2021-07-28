// 새로 추가 된 저장된 목록을 추가해서 저장
//ok: 저장할 때 storage의 마지막에 저장
// storage에서 마지막 value 가져오기
//ok: title, url을 저장해 놓은 걸 indexing 할 수 있는지
//ok: 누적 저장으로 slicing? ex) 6, 3, 5 -> 6, 9, 14
//ok: tabs_count

//저장한 데이터 꺼내와서 확인하기

var curruentTabsLength = 0;
var total_tabs_length = 0;
var time_flag = 0;

function saved_tabs_data(saved_tabs_data){
    if(saved_tabs_data==true)
    {
        console.log("11111");
        var saved_tabs_data = [];
        chrome.storage.sync.get("save_count", function (items) {
            console.log("22222");
            var save_count = items["save_count"];
            console.log("save count: ", items["save_count"]);
            saved_tabs_data.push(save_count);
            chrome.storage.sync.get("tabs_length", function (items) {
                console.log("tabs_length: ", items["tabs_length"]);
                curruentTabsLength = items["tabs_length"][save_count];
                console.log(curruentTabsLength);
                for(var i =0; i<items["tabs_length"].length; i++)
                {
                    total_tabs_length += items["tabs_length"][i];
                }
                console.log("33333");
                console.log("total_tabs_length: ", total_tabs_length);
                saved_tabs_data.push(total_tabs_length);
            });
        });
    }console.log("44444");
    return saved_tabs_data;
}

function data_load(loadData){
    if (loadData==true)
    {
        var saved_tabs_data = [];
        saved_tabs_data = saved_tabs_data(true);
        console.log(saved_tabs_data);
        // 0: save_count, 1: total_tabs_length
        
        // 위에있는 get이 끝나고 나서(데이터가 불러와 지고 나서) html 태그 만들기
        // save_count : tabs_length  ex) 1:1, 2:3, 3:8
        // hash map? key 날짜 / value 탭들 => ui

        console.log("get 진입 전");
        
        chrome.storage.sync.get("title", function (items) {
            
            console.log("get test: ",items["title"]);

            var newDiv = document.createElement("div"); newDiv.className = "save_item";
            document.getElementById("save_list").appendChild(newDiv);
            console.log("test1");
            for (var i = 0; i < curruentTabsLength; i++) {
        
            // html 태그 만들기
                var newLi = document.createElement("li");
                var newSpan = document.createElement("span");
                var newInput = document.createElement("input");
                //총 6, 지금 3개 출력, total - current + i
                console.log("test2");
                console.log(items["title"][total_tabs_length - curruentTabsLength + i]);
                var spanText = document.createTextNode(items["title"][total_tabs_length - curruentTabsLength + i]);
                newSpan.appendChild(spanText);
                newInput.type="checkbox";
                newDiv.appendChild(newLi);
                newLi.appendChild(newInput); newLi.appendChild(newSpan);                
            }
            // 전체 선택 버튼
            var newLi = document.createElement("li");
            var newInput = document.createElement("input");

            document.getElementById("save_list").appendChild(newLi);
            newInput.type="checkbox";
            newLi.appendChild(newInput); 
        });
        
    }
}


//불러오기 버튼 누르면 저장되어있는 url을 현재 윈도우에 탭으로 띄워 줌
function load(load_flag){
    if(load_flag)
    {
        chrome.storage.sync.get("title", function (items) {
            //2개이상저장
            chrome.storage.sync.get("url", function (items) {
                // items: 저장한 객체의 key/value
                    
                //console.log(items);
                for (var i = 0; i < items["url"].length; i++) {
                    //console.log(items["url"][i]);
                    chrome.tabs.create({url: items["url"][i]});
                    }
                    
                });
        });

    }
}

window.onload = function()
{
  // 새로고침 버튼 만들어야할 듯
    saved_tabs_data(true);
    data_load(true);
    load(false);
    document.getElementsByClassName("load")[0].addEventListener('click', function(){load(true);},false);

};