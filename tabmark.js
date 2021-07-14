//저장한 데이터 꺼내와서 확인하기

function data_load(loadData){
    if (loadData==true)
    {
        chrome.storage.sync.get("title", function (items) {
            // items: 저장한 객체의 key/value
            
            console.log(items);
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

                document.getElementById("left_div").appendChild(newInput);
                document.getElementById("right_div").appendChild(newLi);
                document.getElementById("right_div").appendChild(newSpan);
                
                //console.log(items["title"][i]);
            }
        });

    }
}

//불러오기 버튼 누르면 저장되어있는 url을 현재 윈도우에 탭으로 띄워 줌
function load(load_flag){
    if(load_flag)
    {
        chrome.storage.sync.get("url", function (items) {
            // items: 저장한 객체의 key/value
            
            //console.log(items);
            for (var i = 0; i < items["url"].length; i++) {
                //console.log(items["url"][i]);
                chrome.tabs.create({url: items["url"][i]});
            }
            
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