// 입력값을 가져오고 싶은 input의 id로 접근하여 변수에 넣어둔다.
const todoInput = document.querySelector("#todoInput")

// 추가 div 클릭 함수
function add() {
    // todoInput에 입력 값 (Value)를 변수에 넣어둔다.
    const todoInputValue = todoInput.value
    // add()를 클릭했을 때 추가할 곳 밖의 div의 id로 접근하여 변수에 넣어둔다.
    const todolistDiv = document.querySelector("#todolistDiv")

    // div구성 : 구성을 엘리먼트를 생성하여 변수에 넣어둔다.
    const outDiv = document.createElement("div")
    // 변수에 클래스를 넣어둔다.
    outDiv.className = "flex border-t border-gray-300 pt-2 mt-2 items-center"

    const todoDiv = document.createElement("div")
    todoDiv.className = "flex-1 text-left pr-4 truncate hover:overflow-visible hover:whitespace-normal"

    const todoSpan = document.createElement("span")
    // 변수에 입력한 텍스트를 넣어둔다.
    todoSpan.innerText = todoInputValue

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
    todoDiv.append(todoSpan)
    modifyDiv.append(modifyI)
    deleteDiv.append(deleteI)
    buttonDiv.append(modifyDiv)
    buttonDiv.append(deleteDiv)
    outDiv.append(todoDiv)
    outDiv.append(buttonDiv)
    // 추가할 div 변수에 완성된 구조를 넣는다.
    todolistDiv.append(outDiv)

    // 삭제 구현
    function deleteTodo() {
        outDiv.remove()
    }
    deleteDiv.addEventListener("click", deleteTodo)

    // 수정 구현
    function modifyTodo() {
        // 연필 아이콘일 때
        if (modifyI.classList.contains("fa-pencil")) {
            // 수정 input 생성
            const modifyInput = document.createElement("input")
            modifyInput.value = todoSpan.innerText
            modifyInput.className = "w-full rounded-xl outline-none bg-gray-400 text-white px-2 py-1"
            // 연필에서 체크로 변경
            modifyI.className = "fa-solid fa-check w-[16px]"
            // todoSpan 를 modifyInput 으로 교체
            todoDiv.replaceChild(modifyInput, todoSpan)
        }
        // 체크 아이콘일 때
        else if (modifyI.classList.contains('fa-check')) {
            // 수정하고 있는 input 을 변수로
            const modifyInput = todoDiv.querySelector("input")
            // span 입력값 다시 저장
            todoSpan.innerText = modifyInput.value
            // 체크에서 연필로 변경
            modifyI.className = "fa-solid fa-pencil"
            // modifyInput 을 todoSpan 으로 교체
            todoDiv.replaceChild(todoSpan, modifyInput)
        }
    }
    modifyDiv.addEventListener("click", modifyTodo)
}