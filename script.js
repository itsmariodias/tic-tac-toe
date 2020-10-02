var player1, player2, player1_name, player2_name, play_board, board_full;
var board_container = document.querySelector(".play-area");
var winner = document.getElementById("winner");
var turn = 1;
var current_player = document.getElementById("current_player");
current_player.style.display = "block";

function start_board() {
  reset_board();
  player1 = "X";
  player2 = "0";
  player1_name = $('#player1').val() || "Player X";
  player2_name = $('#player2').val() || "Player 0";
  document.getElementById("players").style.display = "none";
  document.getElementById("board").style.display = "block";
  //initial render
  render_board();
};

function reset_board() {
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("player1Win");
  winner.classList.remove("player2Win");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

function render_board() {
  board_container.innerHTML = "";
  player_turn_title();
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block block${turn}" onclick="current_turn(${i})">${play_board[i]}</div>`
    if (e == player1 || e == player2) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

function player_turn_title() {
  if(turn) {
    current_player.className = "player1turn";
    current_player.innerText = `${player1_name}'s Turn`;
  }
  else {
    current_player.className = "player2turn";
    current_player.innerText = `${player2_name}'s Turn`;
  }
};

function current_turn(e) {
  if(turn) {
    turn = 0;
    addPlayer1Move(e);
  }
  else {
    turn = 1;
    addPlayer2Move(e);
  }
};

check_board_complete = () => {
  var flag = true;
  play_board.forEach(element => {
    if (element != player1 && element != player2) {
      flag = false;
    }
  });
  board_full = flag;
};


const check_line = (a, b, c) => {
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player1 || play_board[a] == player2)
  );
};

const check_match = () => {
  var winner;
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      winner = who_won(play_board[i]);
      document.querySelector(`#block_${i}`).classList.add(winner);
      document.querySelector(`#block_${i + 1}`).classList.add(winner);
      document.querySelector(`#block_${i + 2}`).classList.add(winner);
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      winner = who_won(play_board[i]);
      document.querySelector(`#block_${i}`).classList.add(winner);
      document.querySelector(`#block_${i + 3}`).classList.add(winner);
      document.querySelector(`#block_${i + 6}`).classList.add(winner);
      return play_board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    winner = who_won(play_board[0]);
    document.querySelector("#block_0").classList.add(winner);
    document.querySelector("#block_4").classList.add(winner);
    document.querySelector("#block_8").classList.add(winner);
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    winner = who_won(play_board[2]);
    document.querySelector("#block_2").classList.add(winner);
    document.querySelector("#block_4").classList.add(winner);
    document.querySelector("#block_6").classList.add(winner);
    return play_board[2];
  }
  return "";
};

const who_won = (res) => {
  if (res == player1) {
    return "win1";
  }
  else if (res == player2) {
    return "win2";
  }
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player1) {
    current_player.style.display = "none";
    winner.innerText = "Winner is "+player1_name+"!";
    winner.classList.add("player1Win");
    board_full = true
  } else if (res == player2) {
    current_player.style.display = "none";
    winner.innerText = "Winner is "+player2_name+"!";
    winner.classList.add("player2Win");
    board_full = true
  } else if (board_full) {
    current_player.style.display = "none";
    winner.innerText = "Draw!";
    winner.classList.add("draw");
  }
};

function game_loop() {
  render_board();
  check_board_complete();
  check_for_winner();
}

const addPlayer1Move = e => {
  if (!board_full && play_board[e] == "") {
    play_board[e] = player1;
    game_loop();
  }
};

const addPlayer2Move = e => {
    if (!board_full && play_board[e] == "") {
    play_board[e] = player2;
    game_loop();
  }
};
