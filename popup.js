var listURL = [];
var listTitle = [];

//���� �����쿡 �����ִ� �� ����(url, title) ��������
chrome.windows.getAll({     //getAll()�� ��� �����쿡 ���� ���� ������
    populate : true
}, function(window_list){
    var numWindows = window_list.length;

    for(var i=0; i<numWindows; i++){
        for(var j=0; j<window_list[i].tabs.length; j++){
            document.querySelector('#list').innerHTML += window_list[i].tabs[j].title+"<br/><hr width='330; color='#A4A4A4>'";  //���� Ÿ��Ʋ�� ��� ����
            listURL=listURL.concat(window_list[i].tabs[j].url);                 //�����ִ� ���� URL ����
            listTitle=listTitle.concat(window_list[i].tabs[j].title);           //�����ִ� ���� title ����
        }
        
    }
});
