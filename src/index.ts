import '../assets/reset.css'
import '../assets/index.scss';

function initialize() {
    let rt_search = document.querySelector('#rt_search') as HTMLElement;
    if(rt_search) {
        let rt_search_result = document.querySelector('.rt_search_result') as HTMLElement;
        rt_search.addEventListener('click', (e) => {
            if(rt_search.innerText === "검색") {
                deleteAllRow();
                LoadRealty();
                rt_search_result.style.display = "block";
                rt_search.innerText = "숨기기";
            } else {
                deleteAllRow();
                rt_search_result.style.display = "none";
                rt_search.innerText = "검색";
            }
            
        });
    }

    const rt_result = document.querySelector('#rt_result');
    if(rt_result) {
        let rt_result_group = document.querySelector('.rt_result_group') as HTMLElement;
        rt_result.addEventListener('click', (e) => {
            if(rt_result_group.style.display === "block") {
                rt_result_group.style.display = "none";
            } else {
                rt_result_group.style.display = "block";
            }
        });
    }
}

function deleteAllRow() {
    let tbody = document.querySelector('#rt_search_body') as HTMLTableElement;
    let totCnt = (tbody && tbody.childElementCount) || 0;
    if(tbody) {
        for(let i=0; i<totCnt; i++) {
            tbody.deleteRow(0); // 하단부터 삭제
        }
    }
}

function addRow(seq: number, children : HTMLTableElement) {
    let arrChild = Array.from(children.children);
    let tbody = document.querySelector('#rt_search_body');
    let tr = document.createElement("tr");
    let result;

    let td1 = document.createElement("td");
    td1.innerText = seq.toString();
    let td2 = document.createElement("td");
    result = arrChild.filter(function(e: any) {
        return e.nodeName === "아파트";
    });
    if(result && result.length > 0) {
        td2.innerText = result[0].innerHTML.trim();
    }
    
    let td3 = document.createElement("td");
    result = arrChild.filter(function(e: any) {
        return e.nodeName === "거래금액";
    });
    if(result.length > 0) {
        td3.innerText = result[0].innerHTML.trim();
    }

    let td4 = document.createElement("td");
    result = arrChild.filter(function(e: any) {
        return e.nodeName === "건축년도";
    });
    if(result.length > 0) {
        td4.innerText = result[0].innerHTML.trim();
    }

    let td5 = document.createElement("td");
    result = arrChild.filter(function(e: any) {
        return e.nodeName === "전용면적";
    });
    if(result.length > 0) {
        td5.innerText = result[0].innerHTML.trim();
    }
    
    let td6 = document.createElement("td");
    result = arrChild.filter(function(e: any) {
        return e.nodeName === "층";
    });
    if(result.length > 0) {
        td6.innerText = result[0].innerHTML.trim() + '층';
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    if(tbody) {
        tbody.appendChild(tr);
    }
}

function LoadRealty() {
    let xhr = new XMLHttpRequest();
    let parser, xmlDoc, children;
    let seq = 0;
    
    xhr.open("POST", "/api/call");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(this.responseText,"text/xml");
            children = xmlDoc.getElementsByTagName('body')[0].firstElementChild as HTMLTableElement;
            
            if(children) {
                for(var i=0; i < children.childElementCount; i++) {
                    addRow(++seq, children.childNodes[i] as HTMLTableElement);
                }
            }
            
        }
    };
    xhr.send(JSON.stringify({ 
        "serviceKey": "o9cN%2F0w8po32sX1zOEKmo%2BsF%2BQijO6CcaLZmCAcVj45SuyHOPoCCrYbIbjE33hcAN5%2B649xyJV7%2B7ZH8T8PFTA%3D%3D",
        "pageNo": "1",
        "numOfRows": "10",
        "LAWD_CD": "11710",
        "DEAL_YMD": "201512",
        }));
}

initialize();
