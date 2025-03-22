var game = ["", "", "", "", "", "", "", "", ""];

document.addEventListener("DOMContentLoaded", () => {
  const cells = Array.from(document.querySelectorAll('input[type="radio"]'));
  const moves = [];
  const playedPositions = new Set();

  const resetButton = document.getElementById("reset-btn");
  const messageEl = document.getElementById("result-text");
  const endEl = document.getElementById("end");

  cells.forEach((input) => {
    input.addEventListener("change", () => {
      const [_, cellIndex, player] = input.id.split("-");

      if (playedPositions.has(cellIndex)) return;

      playedPositions.add(cellIndex);
      moves.push({ player, position: parseInt(cellIndex) });
      game[parseInt(cellIndex)] = player;

      const winner = eval_game(game);

      if (winner !== 0 || av_moves(game).length === 0) {
        if (winner === 1) {
          messageEl.textContent = "The AI won!";
        } else if (winner === -1) {
          messageEl.textContent = "You won!";
        } else {
          messageEl.textContent = "Tied game!";
        }
        endEl.style.display = "flex";
        return;
      }

      if (player === "x") {
        setTimeout(() => ai(game), 100);
      }
    });
  });

  resetButton.addEventListener("click", () => {
    for (let i = 0; i < game.length; i++) {
      game[i] = "";
    }
    playedPositions.clear();
    moves.length = 0;

    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach((radio) => (radio.checked = false));

    endEl.style.display = "none";

    console.clear();
    console.log("Game reset. Ready to play!");
  });

  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("floating-tictactoe").style.display = "none";
  });

  const dragElement = (element, header) => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
      element.style.bottom = "auto";
      element.style.right = "auto";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  dragElement(
    document.getElementById("floating-tictactoe"),
    document.querySelector("#floating-tictactoe .header")
  );
});

const av_moves = (board) => {
  return board
    .map((player, i) => (player === "" ? i : null))
    .filter((pos) => pos !== null);
};

const eval_game = (board) => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i * 3] === board[i * 3 + 1] &&
      board[i * 3 + 1] === board[i * 3 + 2] &&
      board[i * 3] !== ""
    ) {
      return board[i * 3] === "o" ? 1 : -1;
    }
    if (
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6] &&
      board[i] !== ""
    ) {
      return board[i] === "o" ? 1 : -1;
    }
  }

  if (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
    return board[0] === "o" ? 1 : -1;
  }
  if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
    return board[2] === "o" ? 1 : -1;
  }

  return 0;
};

const minimax = (board, depth, isMaximizing) => {
  const score = eval_game(board);
  if (score === 1 || score === -1) return score;
  if (av_moves(board).length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let move of av_moves(board)) {
      board[move] = "o";
      best = Math.max(best, minimax(board, depth + 1, false));
      board[move] = "";
    }
    return best;
  } else {
    let best = Infinity;
    for (let move of av_moves(board)) {
      board[move] = "x";
      best = Math.min(best, minimax(board, depth + 1, true));
      board[move] = "";
    }
    return best;
  }
};

const ai = (board) => {
  let bestScore = -Infinity;
  let bestMove = null;

  for (let move of av_moves(board)) {
    board[move] = "o";
    let score = minimax(board, 0, false);
    board[move] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  if (bestMove !== null) {
    const input = document.getElementById(`cell-${bestMove}-o`);
    if (input && !input.checked) {
      input.checked = true;
      input.dispatchEvent(new Event("change"));
    }
  }
};

// DRAG FUNCTIONALITY for all windows
function makeDraggable(windowEl) {
  const header = windowEl.querySelector(".header");
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  header.onmousedown = (e) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = drag;
  };

  function drag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    windowEl.style.top = windowEl.offsetTop - pos2 + "px";
    windowEl.style.left = windowEl.offsetLeft - pos1 + "px";
    windowEl.style.bottom = "auto";
    windowEl.style.right = "auto";
  }

  function closeDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Make all windows draggable
document.querySelectorAll(".game-window").forEach((win) => {
  makeDraggable(win);
});

// Close buttons
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".game-window").style.display = "none";
  });
});

// Rock Paper Scissors Logic
const rpsChoices = ["rock", "paper", "scissors"];
const rpsOutput = document.getElementById("rps-output");

document.querySelectorAll(".rps-choice").forEach((btn) => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.move;
    const ai = rpsChoices[Math.floor(Math.random() * 3)];

    let result = "";
    if (player === ai) result = "It's a tie!";
    else if (
      (player === "rock" && ai === "scissors") ||
      (player === "paper" && ai === "rock") ||
      (player === "scissors" && ai === "paper")
    )
      result = `You win! AI chose ${ai}`;
    else result = `AI wins! AI chose ${ai}`;

    rpsOutput.textContent = result;
  });
});
