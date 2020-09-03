var listURL = [];
var listTitle = [];

//���� �����쿡 �����ִ� �� ����(url, title) ��������
chrome.windows.getAll({     //getAll()�� ��� �����쿡 ���� ���� ������
    populate : true
}, function(window_list){
    numWindows = window_list.length;            //console.log�� ���� 1�� ����
    var str;
    var count=0;            //������ ������� �����ִ� ��� ���� ������ ������ ����

    for(var i=0; i<numWindows; i++){                                               //�����ִ� window�� ����
        for(var j=0; j<window_list[i].tabs.length; j++){                           //windows_list[i].tabs.length = ���µǾ� �ִ� ���� ����
            count++;
            listURL=listURL.concat(window_list[i].tabs[j].url);                 //�����ִ� ���� URL ����
            listTitle=listTitle.concat(window_list[i].tabs[j].title);           //�����ִ� ���� title ����            
        }
    }

    for(i=0; i<count; i++){
        str = replace_for(listTitle[i]);                                        //�ؽ�Ʈ�� �� ���� title
        document.querySelector('#list').innerHTML +=
        "<input type='checkbox' name='check' value="+i+" checked/>"             //üũ�ڽ� ����
        +str+"<br/>";
    }
});

//html �±׸� �ؽ�Ʈ�� ��ȯ�ϴ� �Լ�
function replace_for(str){
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;")
}
