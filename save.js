//üũ�ڽ��� üũ�� url�� storage�� ����
//1. üũ�ڽ��� üũ�� url �ĺ�
//2. �ĺ��� url�� storage�� ����
var strURL = [];                //storage�� ����Ǵ� �������� URL
var strTitle = [];              //storage�� ����Ǵ� �������� title

function clickhandler(e){
    var storeURL = [];          //��ư ���� ������ �迭 �ʱ�ȭ
    var storeTitle = [];        //��ư ���� ������ �迭 �ʱ�ȭ
    var chkbox = document.querySelectorAll("#list input[type='checkbox']:checked"); //üũ�ڽ��� üũ�� �͵鸸 ��������
    for(var i=0; i<chkbox.length; i++){                                             //üũ�ڽ� üũ�� ������ŭ �ݺ�
        storeURL.push(listURL[chkbox[i].value]);                //������ ���� url�� �ӽù迭�� ����
        storeTitle.push(listTitle[chkbox[i].value]);            //������ ���� title�� �ӽù迭�� ����
        strURL.push(storeURL[i]);                               //�ӽù迭 ������ �������� �迭�� ����
        strTitle.push(storeTitle[i]);                           //�ӽù迭 ������ �������� �迭�� ����
    }
    chrome.storage.sync.set({"url" : strURL, "title" : strTitle},           //�������� �迭�� ũ�� storage�� ������ ���� url�� title ����
        function(){ 
            if(chrome.runtime.error){                       //����ó��
                console.log("Runtime Error.");
            }
        });
}

document.getElementById("save").addEventListener("click", clickhandler);            //�����ϱ� ��ư�� ������ �̺�Ʈ ����



