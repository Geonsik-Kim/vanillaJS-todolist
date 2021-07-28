'use strict'

window.addEventListener('DOMContentLoaded', (event) => {
    const inputBox = document.querySelector(".input-box input");
    const btnAdd = document.querySelector(".btn-add");
    const todoUl = document.querySelector(".list-area");
    const todoTabBtn = document.querySelectorAll(".tab-area button");
    let numTop = document.querySelector(".top .txt span");
    let numTypeAll = document.querySelector(".tab-area").children[0].querySelector("span").innerText;
    let numTypeIng = document.querySelector(".tab-area").children[1].querySelector("span").innerText;
    let numTypeEnd = document.querySelector(".tab-area").children[2].querySelector("span").innerText;
    let idx = 0;

    // 추가 버튼 클릭 시
    btnAdd.addEventListener("click", function(){
        let val = inputBox.value;

        // 해야 할 일을 입력 하지 않을 경우
        if(val.length < 1){
            alert("해야 할 일을 입력해주세요!");
            return;
        }

        // 리스트 항목 li 생성
        const createLi = document.createElement("li");

        // checkbox 생성
        let chk = document.createElement("input");
        chk.type = "checkbox";
        chk.id = "choice"+idx;
        chk.className = "blind";

        // label 생성 (입력한 해야 할 일 텍스트가 들어감)
        let lbl = document.createElement("label");
        lbl.setAttribute("for","choice"+idx);
        lbl.innerText = val;

        // 삭제버튼 생성
        const button = document.createElement("button");
        button.className = "btn-remove";
        button.innerHTML= "<i class='fas fa-trash'><span class='blind'>삭제</span></i>";

        todoUl.prepend(createLi);
        createLi.appendChild(chk);
        createLi.appendChild(lbl);
        createLi.appendChild(button);

        idx++;

        // 추가 후 input 비우기
        inputBox.value = "";

        // 분류별 항목 개수 카운팅
        numTypeAll++;
        document.querySelector(".tab-area").children[0].querySelector("span").innerText = numTypeAll;

        numTypeIng++;
        document.querySelector(".tab-area").children[1].querySelector("span").innerText = numTypeIng;
        numTop.innerText = numTypeIng;

        // 전체보기가 활성화 되도록
        let todoLi = document.querySelectorAll(".list-area li");
        if(!todoTabBtn[0].classList.contains("active")){
            for(const item of todoLi){
                item.style.display = "block";
            }
            for(const item of todoTabBtn){
                item.classList.remove("active"); 
            }
            todoTabBtn[0].classList.add("active");
        }
        
        // 항목 삭제 시
        button.addEventListener("click", function(e){
            e.currentTarget.parentElement.remove();
            itemRemove(e);
        })

        // 항목 완료 처리 시
        chk.addEventListener("change", function(e){
            itemComplete(e);
        })
    })

    // 항목 완료 처리 시
    function itemComplete(state){
        if(state.currentTarget.checked){
            numTypeIng--;
            document.querySelector(".tab-area").children[1].querySelector("span").innerText = numTypeIng;
            numTypeEnd++;
            document.querySelector(".tab-area").children[2].querySelector("span").innerText = numTypeEnd;
            numTop.innerText = numTypeIng;
        } else {
            numTypeIng++;
            document.querySelector(".tab-area").children[1].querySelector("span").innerText = numTypeIng;
            numTypeEnd--;
            document.querySelector(".tab-area").children[2].querySelector("span").innerText = numTypeEnd;
            numTop.innerText = numTypeIng;
        }
    } 

    // 항목 삭제 시
    function itemRemove(state){
        numTypeAll--;
        document.querySelector(".tab-area").children[0].querySelector("span").innerText = numTypeAll;

        if(state.currentTarget.parentElement.firstChild.checked){
            numTypeEnd--;
            document.querySelector(".tab-area").children[2].querySelector("span").innerText = numTypeEnd;
        } else {
            numTypeIng--;
            document.querySelector(".tab-area").children[1].querySelector("span").innerText = numTypeIng;
            numTop.innerText = numTypeIng;
        }
    }

    // 탭 클릭 시 click event 부여하기
    for(let i=0;i<todoTabBtn.length;i++){
        todoTabBtn[i].addEventListener("click", function(){
            sort(i);
        })
    }
    
    // 탭 클릭 시 항목 분류하기
    function sort(num){
        let todoLi = document.querySelectorAll(".list-area li");
        let chkTypeChecked = document.querySelectorAll(".list-area li input[type=checkbox]:checked");
        
        // 선택된 탭에 클래스 주기
        var activeBtn = document.querySelectorAll(".tab-area .active");
        for(const item of activeBtn){
            item.classList.remove("active");
        }
        document.querySelector(".tab-area").children[num].querySelector("button").classList.add("active");

        // 선택된 탭에 따라 분류하기
        console.log(todoLi)
        if(todoLi.length > 0){
            switch (num){
                case 0:
                    for(const item of todoLi){
                        item.style.display = "block";
                    }
                    break;
                case 1:
                    for(const item of todoLi){
                        item.style.display = "block";
                    }
                    for(const item of chkTypeChecked){
                        item.parentElement.style.display = "none";
                    }
                    break;
                case 2:
                    for(const item of todoLi){
                        item.style.display = "none";
                    }
                    for(const item of chkTypeChecked){
                        item.parentElement.style.display = "block";
                    }
                    break;
            }
        }
    }
});
