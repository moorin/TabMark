var listURL = [];
var listTitle = [];

//���� �����쿡 �����ִ� �� ����(url, title) ��������
chrome.windows.getAll({     //getAll()�� ��� �����쿡 ���� ���� ������
    populate : true
}, function(window_list){
    var numWindows = window_list.length;            //console.log�� ���� 1�� ����
    var str;

    for(var i=0; i<numWindows; i++){                      
        for(var j=0; j<window_list[i].tabs.length; j++){                        //windows_list[i].tabs.length = ���µǾ� �ִ� ���� ����
            str = replace_for(window_list[i].tabs[j].title);                    //Title�� ����ִ� html �±׸� �ؽ�Ʈ�� ��ȯ
            document.querySelector('#list').innerHTML +=
            "<input type='checkbox' name='check' value="+j+" checked/>"         //üũ�ڽ� ����(üũ����)
            +str                                                                //�ؽ�Ʈ�� �� ���� title
            +"<br/><hr width='330'; color='#A4A4A4>'";                          //�ٹٲ�+���м�
            listURL=listURL.concat(window_list[i].tabs[j].url);                 //�����ִ� ���� URL ����
            listTitle=listTitle.concat(window_list[i].tabs[j].title);           //�����ִ� ���� title ����
        }
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
