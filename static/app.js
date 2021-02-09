// button click event: this will keep the page from refreshing.
// When the button is clicked, jQuery will get the form value,
// create an AJAX request, and send this to a route on the server
// ("/find-word"). This route will use the "check_valid_word" function
// in boggle.py to check for a word. check_valid_word will check for the
// word and send a response back to the front-end. THIS function will
// receive a JSON request and tell the user whether the word they submitted
// is either: a) "ok" (in the grid) b) "not-on-board" or c) "not-a-word"
// (not in the "words" array). A flash can be used to tell the user what
// what just happened

// this array will store the user's guesses AND tell them whether they
// are right (easy) and if they were wrong, will tell them the guess was
// a) not a word, b) on the board, but not a word

// get the word from the input field and send it on over to flask. The
// response should tell the user

class BoggleGame {
  constructor(boardId) {
    this.words = new Set();
    this.board = $("#" + boardId);
    $(".submit-word", this.board).on("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const $word = $(".word", this.board);
    let word = $word.val();
    if (this.words.has(word)) {
      this.showMessage(`Already found ${word}`);
      return;
    }

    const response = await axios.get("/check-answer", {
      params: { word: word },
    });
    if (response.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word on this board`, "error");
    } else if (response.data.result === "not-word") {
      this.showMessage(`${word} is not a valid English word`, "error");
    } else {
      this.addWord(word);
      this.showMessage(`Added: ${word} to list`, "ok");
      this.words.add(word);
    }
    console.log(response.data.result);
    $word.val("").focus();
  }

  showMessage(msg, cls) {
    $(".feedback", this.board)
      .text(msg)
      .removeClass()
      .addClass(`feedback ${cls}`);
  }

  addWord(word) {
    $(".guesses", this.board).append($("<li>", { text: word }));
  }
}
