// 입력값을 가져오고 싶은 input의 id로 접근하여 변수에 넣어둔다.
const todoInput = document.querySelector("#todoInput")

// 추가 div 클릭 함수
function add() {
    // todoInput에 입력 값 (Value)를 변수에 넣어둔다.
    const todoInputValue = todoInput.value
    // add()를 클릭했을 때 추가할 곳 밖의 div의 id로 접근하여 변수에 넣어둔다.
    const todoUl = document.querySelector("#todoUl")

    // div구성 : 구성을 엘리먼트를 생성하여 변수에 넣어둔다.
    const todoLi = document.createElement("li")
    // 변수에 클래스를 넣어둔다.
    todoLi.className = "flex items-center mt-3"

    const todoCheckboxDiv = document.createElement("div")
    todoCheckboxDiv.className = "flex items-center"

    // 체크박스 추가
    const todoCheckbox = document.createElement("input")
    todoCheckbox.className = "w-5 h-5 border border-blue-300"
    todoCheckbox.type = "checkbox"
    todoCheckbox.id = "chk"
    // 체크시 할일 텍스트 css 추가
    todoCheckbox.addEventListener("click", () => {
		todoTextSpan.classList.toggle("line-through")
        todoTextSpan.classList.toggle("text-gray-400")
    })
    
    const todoDiv = document.createElement("div")
    todoDiv.className = "flex-1 flex p-3 ml-2 items-center rounded-2xl bg-gray-100 border border-gray-300"

    const todoTextDiv = document.createElement("div")
    todoTextDiv.className = "flex-1 flex items-center text-left pr-4"

    const todoTextSpan = document.createElement("span")
    // 변수에 입력한 텍스트를 넣어둔다.
    todoTextSpan.innerText = todoInputValue
    todoTextSpan.className = "text-gray-600"

    const buttonDiv = document.createElement("div")
    buttonDiv.className = "flex"

    const modifyDiv = document.createElement("div")
    modifyDiv.className = "px-2 py-1 bg-blue-600 hover:bg-blue-800 rounded-lg text-white hover:cursor-pointer"

    const modifyI = document.createElement("i")
    modifyI.className = "fa-solid fa-pencil"

    const deleteDiv = document.createElement("div")
    deleteDiv.className = "px-2 py-1 bg-red-600 hover:bg-red-800 rounded-lg text-white ml-2 hover:cursor-pointer"

    const deleteI = document.createElement("i")
    deleteI.className = "fa-solid fa-trash"

    // div를 트리 구성대로 안으로 포함시킨다. Depth가 깊은 것부터 넣는다.
    todoTextDiv.append(todoCheckbox)
    todoTextDiv.append(todoTextSpan)
    modifyDiv.append(modifyI)
    deleteDiv.append(deleteI)
    buttonDiv.append(modifyDiv)
    buttonDiv.append(deleteDiv)
    todoDiv.append(todoTextDiv)
    todoDiv.append(buttonDiv)
    todoCheckboxDiv.append(todoCheckbox)
    todoLi.append(todoCheckboxDiv)
    todoLi.append(todoDiv)

    // 추가할 div 변수에 완성된 구조를 넣는다. / 입력값이 있을때만
    if (todoInput.value.length > 0) {
        todoUl.append(todoLi)
    }
    else {
        alert("할 일을 입력해주세요.")
    }

    // todoInput 의 value 값을 초기화한다.
    todoInput.value = null

    // 삭제 구현 / 확인창 추가
    function deleteTodo() {
        const deleteConfirm = confirm("정말 삭제하시겠어요?");
        if (deleteConfirm) {
            todoLi.remove()
        }
    }
    deleteDiv.addEventListener("click", deleteTodo)

    // 수정 구현
    function modifyTodo() {
        // 연필 아이콘일 때
        if (modifyI.classList.contains("fa-pencil")) {
            // 수정 input 생성
            const modifyInput = document.createElement("input")
            modifyInput.value = todoTextSpan.innerText
            modifyInput.className = "w-full rounded-xl outline-none bg-gray-300 text-white px-2 py-1"
            modifyInput.id = "modifyInput"
            // 연필에서 체크로 변경
            modifyI.className = "fa-solid fa-check w-[16px]"
            // todoTextSpan 를 modifyInput 으로 교체
            todoTextDiv.replaceChild(modifyInput, todoTextSpan)
        }
        // 체크 아이콘일 때
        else if (modifyI.classList.contains('fa-check')) {
            // 수정하고 있는 input 을 변수로
            const modifyInput = todoTextDiv.querySelector("#modifyInput")
            // span 입력값 다시 저장
            todoTextSpan.innerText = modifyInput.value
            // 체크에서 연필로 변경
            modifyI.className = "fa-solid fa-pencil"
            // modifyInput 을 todoTextSpan 으로 교체
            todoTextDiv.replaceChild(todoTextSpan, modifyInput)
        }
    }
    modifyDiv.addEventListener("click", modifyTodo)
}

// 전체선택 체크박스
const selectAllCheckbox = document.querySelector("#selectAllCheckbox")
selectAllCheckbox.addEventListener("click", checkAll)

// 전체선택 or 전체선택 해제
function checkAll() {
    const allCheckbox = document.querySelectorAll("#chk");
    if (selectAllCheckbox.checked) { 
      allCheckbox.forEach((el) => (el.checked = true)) // 공부 필요
    } else {
      allCheckbox.forEach((el) => (el.checked = false))
    }
}

// 전체삭제
function deleteAll() {
    const checkedTodo = document.querySelectorAll("#chk:checked")
    const selectedCheckboxCnt = checkedTodo.length
    if (selectedCheckboxCnt > 0) { 
        const deleteConfirm = confirm("선택된 할일을 삭제하시겠어요?")
        if (deleteConfirm) {
            checkedTodo.forEach(
                function(my) {
                const parentNode = my.parentNode
                const reparent = parentNode.parentNode
                reparent.remove();
                }
            )
        }
    }
}

