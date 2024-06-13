document.addEventListener("DOMContentLoaded", function(){
    addToInput //번호 클릭 시 화면에 입력되고 정답 배열에 추가
    makeAnswer() // 정답 생성하기
    showArray() // 정답과 답변을 비교하여 힌트제공
    // resetInput() // input 초기화, 배열 초기화
});

let answer = []
let numInputSun = 0

let ib = document.querySelectorAll('.input-box')
function clickedDisable () {
    ib.forEach((el) => {
        el.addEventListener('click', (e)=> {
            e.target.disabled = true
        })
    })
}
function clickedAble() {
    ib.forEach((el) => {
        el.disabled = false
    })

}

let addToInput = (number) => {
    
    if(numInputSun < 4) {
        
        const inputBox = document.getElementById(`nb${numInputSun+1}`);
        inputBox.innerText=number;
        answer.push(number)
        numInputSun++;
         
    }
}

let correctAnswer =[]
function makeAnswer() {
    for(let i=0; i <4; i++) {
        const rand = Math.floor(Math.random() * 10);
        if (correctAnswer.indexOf(rand) === -1) {
            correctAnswer.push(rand)
        } else {
            i--
        }   
    }
    console.log(`정답 ${correctAnswer}`)
}

let recordList = document.querySelector('.record-list')
let check = document.querySelector('.check')

function showArray() {
    check.addEventListener('click', () => {
        let same = correctAnswer.filter(x => answer.includes(x))

        console.log(`같은 수 ${same.length}`)

        
        
        let arrayEqauls = (arr1, arr2) => {
            let count = 0
            for(let i=0; i<arr1.length; i++) {
                if(arr1[i] == arr2[i]) {
                    count++
                }
            }

            return count
        }
        console.log(`같은 자리 수 ${arrayEqauls(correctAnswer, answer)}`)

        let strk = arrayEqauls(correctAnswer, answer);
        let ball = same.length - arrayEqauls(correctAnswer, answer);
        let out = 4 - same.length;
        
        if(strk == 4) {
            alert(`${answer} 정답입니다!`)
            recordList.innerHTML = ''
            correctAnswer =[]
            makeAnswer()
        } else {
            recordList.insertAdjacentHTML('beforeend', `<li><p class="num">[${answer}]</p><p class='strk'>${strk}S<p/><p class='ball'>${ball}B</p><p class='out'>${out}O</p></li>`)
        }

        resetInput()
    })
    
}

//input 초기화, 배열 초기화
function resetInput() {
    let inputBox = document.querySelectorAll('.num-box')
    inputBox.forEach((el) => {
        el.innerText=null
    })
    numInputSun = 0
    answer = []

    clickedAble()
}
