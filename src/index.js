// 스타트 버튼 클릭

const startPage = document.querySelector('.start-page')

document.querySelector('.start-btn').addEventListener('click', e=> {
  startPage.classList.add('start-act')
})

// 플레이어 이름 값 가져오기

// 기본값 함수

function player1(name = "player1"){
  return name;
}

function player2(name = "player2"){
  return name;
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

  if (gomoku(boardState) === 0) {
    document.querySelector(".result").textContent = "경기중";
  } else if (gomoku(boardState) === 1) {
    document.querySelector(".result").textContent = "p1!";
  } else {
    document.querySelector(".result").textContent = "p2!";
  }
}
// ----------


// 체크 로직
function gomoku(arr) {
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

        if (!gomoku(boardState)) {
          if (boardState[rowIndex][colIndex] !== 0) {

            alert("돌 위에 두면 안됨");
          } else {
            boardState[rowIndex][colIndex] = currentStone;
          }
          currentStone = boardState[rowIndex][colIndex] === 1 ? 2 : 1;

          drawBoard();
        }


      // ---

    });
  });
});
// ------


// -------
// 다시 시작 버튼 - 이벤트리스너는 바깥에 생성해주자!
document.querySelector(".reset").addEventListener("click", e => {
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

  startPage.classList.remove('start-act');
});

// 함수를 호출했을 때!! boardState의 상태에서 그려지게!
drawBoard();
