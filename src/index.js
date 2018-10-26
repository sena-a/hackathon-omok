// 스타트 버튼 클릭

const startPage = document.querySelector('.start-page')

const winnerPage = document.querySelector('.winner-page')

const startPlayersEl = document.querySelector('.start-players')

const player1El = document.querySelector('.player1-name')
const player2El = document.querySelector('.player2-name')

document.querySelector('.start-btn').addEventListener('click', e=> {
  startPage.classList.add('start-act')
  player1El.textContent = player1(startPlayersEl.player1.value)
  player2El.textContent = player2(startPlayersEl.player2.value)
})

// 플레이어 이름 값 함수

function player1(name){
  if(name === ''){return 'Player1';}else{
    return name;
  }
}

function player2(name){
  if(name === ''){return 'Player2';}else{
    return name;
  }
}

// 게임 로직
// 현재 놓여진 돌이
let currentStone = 1

let playerTurn = false

// 게임판의 상태를 만들기
let boardState = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// -------
// 상태로부터 화면을 그리는 역할과 책임을 가지고 있는 함수! 화면을 그리는 것은 다 여기다!
function drawBoard() {
  // 게임판에 1이 적혀있으면 그것은 X표시!
  // 일단, board안에 있는 모든 row들을 선택해보자
  document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
    // 이렇게 사용하면 rowEl의 자식 요소들에서 찾는다.
    rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
      // 중첩루프나 마찬가지인 것으로, 보드스테이트의 요소들을 지정
      if (boardState[rowIndex][colIndex] === 1) {
        colEl.classList.add("black");
      } else {
        colEl.classList.remove("black");
      }
      if (boardState[rowIndex][colIndex] === 2) {
        colEl.classList.add("white");
      } else {
        colEl.classList.remove("white");
      }
    });
  });

  if (omok(boardState) === 1) {
    // winner 닉넴 span태그에 텍스트컨텐츠추가
    document.querySelector('.winner').textContent = player1(startPlayersEl.player1.value)
    // winner-act 추가
    document.querySelector('.winner-page').classList.add('winner1-act')
  } else if(omok(boardState) === 2) {
    document.querySelector('.winner').textContent = player2(startPlayersEl.player2.value)
    document.querySelector('.winner-page').classList.add('winner2-act')
  }
}
// ----------


// 체크 로직
function omok(arr) {
  // 가로줄 확인 - 0일 때도 기록하고 확인하는 것으로 처리(코드가 짧아짐)
  for (let i = 0; i < 15; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < 15; j++) {
      // 새로운 플레이어를 발견했을 때
      // currentPlayer = 지금 내가 보고 있는 위치 혹은 돌
      if (currentPlayer !== arr[i][j]) {
        currentPlayer = arr[i][j];
        count = 1;
      } else {
        count++;
      }
      // 만약 1이나 2가 5번 연속되어 있으면 그 값(currentPlayer)을 반환
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  // 세로줄 확인!
  for (let i = 0; i < 15; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < 15; j++) {
      // 새로운 플레이어를 발견했을 때
      // currentPlayer = 지금 내가 보고 있는 위치 혹은 돌
      if (currentPlayer !== arr[j][i]) {
        currentPlayer = arr[j][i];
        count = 1;
      } else {
        count++;
      }
      // 만약 1이나 2가 5번 연속되어 있으면 그 값(currentPlayer)을 반환
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  // 대각선 왼쪽 : 중앙을 가로지르는 줄
  {
    let currentPlayer;
    let count;
    for (let i = 0; i < 15; i++) {
      if (currentPlayer !== arr[i][i]) {
        currentPlayer = arr[i][i];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  // 대각선 왼쪽 : 중앙을 중심으로 좌측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[i + j][j]) {
          currentPlayer = arr[i + j][j];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  // 대각선 왼쪽 : 중앙을 중심으로 우측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[j][i + j]) {
          currentPlayer = arr[j][i + j];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  // 대각선 오른쪽 : 중앙을 가로지르는 줄
  {
    let currentPlayer;
    let count;
    for (let i = 0; i < 15; i++) {
      if (currentPlayer !== arr[i][14 - i]) {
        currentPlayer = arr[i][14 - i];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  // 대각선 오른쪽 : 중앙을 중심으로 좌측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[j][14 - j - i]) {
          currentPlayer = arr[j][14 - j - i];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  // 대각선 오른쪽: 중앙을 중심으로 우측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[j + i][14 - j]) {
          currentPlayer = arr[j + i][14 - j];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  return 0;
}

// 돌 놓는 이벤트 발생
document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
    colEl.addEventListener("click", e => {
      // 중복이면 클릭되면 안된다.

      // ---

        if (!omok(boardState)) {
          if (boardState[rowIndex][colIndex] !== 0) {
            alert("돌 위에 두면 안됨");
          } else {
            boardState[rowIndex][colIndex] = currentStone;
            currentStone = boardState[rowIndex][colIndex] === 1 ? 2 : 1;
          }
          drawBoard();
        }


      // ---

    });
  });
});
// ------


// -------
// 승자 창의 다시 시작 버튼
document.querySelector('.restart-btn').addEventListener('click', e=> {

  boardState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  currentStone = 1;
  drawBoard();

  winnerPage.classList.remove('winner1-act')
  winnerPage.classList.remove('winner2-act')

  startPlayersEl.player1.value = ''
  startPlayersEl.player2.value = ''

  startPage.classList.remove('start-act');
})

// 다시 시작 버튼 - 이벤트리스너는 바깥에 생성해주자!
document.querySelector(".reset-btn").addEventListener("click", e => {
  // 상태를 초기화 한 다음에 다시 그려준다!
  // alert("!!!!");
  boardState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  currentStone = 1;
  drawBoard();

  startPage.classList.add('start-act');
});

// 함수를 호출했을 때!! boardState의 상태에서 그려지게!
drawBoard();
