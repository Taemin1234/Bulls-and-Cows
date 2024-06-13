document.addEventListener("DOMContentLoaded", function() {
    initGame();
});

const MAX_INPUTS = 4;
let answer = []; // 내가 적은 답
let inputCount = 0; //들어간 숫자 개수
let correctAnswer = []; // 정답
let trylist = 0; // 시도 횟수
let ib = document.querySelectorAll('.input-box')

function initGame() {
    setupEventListeners();
    generateAnswer();
    clickedDisable();
}

// 버튼을 클릭하면 비활성화
function clickedDisable() {
    ib.forEach((el) => {
        el.addEventListener('click', (e)=> {
            e.target.disabled = true
        })
    })
}
// 비활성화 해제
function clickedAble() {
    ib.forEach((el) => {
        el.disabled = false
    })
}

// 확인 버튼을 입력
function setupEventListeners() {
    const checkButton = document.querySelector('.check');
    checkButton.addEventListener('click', () => {
        if(answer.length == 4) {
            evaluateAnswer()
        } else {
            alert('4자리 숫자를 입력해주세요')
        }
    });
}

// 각 숫자를 클릭
function addToInput(number) {
    if (inputCount < MAX_INPUTS) {
        const inputBox = document.getElementById(`nb${inputCount + 1}`);
        inputBox.innerText = number;
        answer.push(number);
        inputCount++;
    }
    // 번호를 입력한 순서대로 보기칸에 채워진다.
    // answer 배열에 숫자들이 들어간다.
}

function generateAnswer() {
    correctAnswer = [];
    while (correctAnswer.length < MAX_INPUTS) {
        const rand = Math.floor(Math.random() * 10);
        if (!correctAnswer.includes(rand)) {
            correctAnswer.push(rand);
        }
    }
    // console.log(`정답: ${correctAnswer}`);
    trylist = 0;
}

// let correctAnswer =[]
// function generateAnswer() {
//     for(let i=0; i <4; i++) {
//         const rand = Math.floor(Math.random() * 10);
//         if (correctAnswer.indexOf(rand) === -1) {
//             correctAnswer.push(rand)
//         } else {
//             i--
//         }   
//     }
//     console.log(`정답 ${correctAnswer}`)
// }

function evaluateAnswer() {
    // 필터 함수로 정답과 내가 선택한 배열을 비교(같은 수만)
    const matchingNumbers = correctAnswer.filter(x => answer.includes(x));
    const strikes = countMatchingPositions(correctAnswer, answer);
    const balls = matchingNumbers.length - strikes;
    const outs = MAX_INPUTS - matchingNumbers.length;

    if (strikes === MAX_INPUTS) {
        alert(`${answer} 정답입니다!`);
        document.querySelector('.record-list').innerHTML = '';
        generateAnswer();
    } else {
        updateRecordList(strikes, balls, outs);
    }

    resetInput();
}

// 두 배열의 자리까지 같은 지 비교
// function countMatchingPositions(arr1, arr2) {
//     return arr1.reduce((count, val, index) => count + (val === arr2[index] ? 1 : 0), 0);
// }
function countMatchingPositions(arr1, arr2) {
    let count = 0
    for(let i=0; i<arr1.length; i++) {
        if(arr1[i] == arr2[i]) {
            count++
        }
    }
    return count
}

// 중간 과정알리는 상황 제공
function updateRecordList(strikes, balls, outs) {
    trylist ++
    const recordList = document.querySelector('.record-list');
    recordList.insertAdjacentHTML('beforeend', 
        `<li>
            <p>${trylist}.</p>
            <p class="num">[${answer}]</p>
            <p class="strk">${strikes}S</p>
            <p class="ball">${balls}B</p>
            <p class="out">${outs}O</p>
        </li>`
    );
}

// 확인이나 지우기를 누르면 지금까지 입력한 정보를 삭제한다.
function resetInput() {
    const inputBoxes = document.querySelectorAll('.num-box');
    inputBoxes.forEach(el => el.innerText = null);
    inputCount = 0;
    answer = [];
    clickedAble()
}
