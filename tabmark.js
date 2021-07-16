// 새로 추가 된 저장된 목록을 추가해서 저장
// 저장할 때 storage의 마지막에 저장
// storage에서 마지막 value 가져오기
// get set.add을 이용해서 해결
//ok: title, url을 저장해 놓은 걸 indexing 할 수 있는지
//ok: 누적 저장으로 slicing? ex) 6, 3, 5 -> 6, 9, 14
//ok: tabs_count

//저장한 데이터 꺼내와서 확인하기

var save_count_list = [];
function data_load(loadData){
    if (loadData==true)
    {
        // chrome.storage.storageArea.local.get("title", function (items){
        //     console.log("new: ",items["title"]);
        // });
        chrome.storage.sync.get("save_count", function (items) {
            //console.log(items);
            for(var i =0; i<=items["save_count"].length; i++)
            {
                console.log("test");
                console.log(items["save_count"][i]);
                save_count_list.push(items["save_count"][i]);
            }
            console.log(save_count_list);
        });
        // 추가된 items
        // index로 분리
        // dict
        // stack? dict? 1:1~13, 2:14~16, 3:17~20 => key 값은 save_count
        chrome.storage.sync.get("title", function (items) {
            // items: 저장한 객체의 key/value
            console.log("old: ",items);
            //console.log("save_count: ",items["save_count"].length);
            var newDiv = document.createElement("div"); newDiv.className = "save_item";
            document.getElementById("save_list").appendChild(newDiv);
            var newDiv = document.createElement("div");
            for (var i = 0; i < items["title"].length; i++) {
            //저장한 파일을 tabmark.html의 <div class="save_list"></div>에 div(index) > li 형태로 띄워주기
            // html 태그 만들기
            // tabmark.html에 추가해야되니까 tabmark.js에 이 코드를 작성해야하고 그러면 변수값을 tabmark.js로 옮겨줘야한다.
                    
                var newLi = document.createElement("li");
                var newSpan = document.createElement("span");
                var newInput = document.createElement("input");


                
                var spanText = document.createTextNode(items["title"][i]);
                newSpan.appendChild(spanText);
                newInput.type="checkbox";
                //console.log(newSpan);

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
    data_load(true);
    load(false);
    document.getElementsByClassName("load")[0].addEventListener('click', function(){load(true);},false);

};