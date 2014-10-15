(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.board = $el;
  };

  View.prototype.bindEvents = function () {
    var view = this;
    $('.ttt').on('click', '.cell', function (event) {
      view.makeMove($(this));
    })
  };

  View.prototype.makeMove = function ($square) {

    var xpos = $square.data('col');
    var ypos = $square.parent().data('row');
    var pos = [ypos, xpos]
    var game = this.game
    if(game.isOver()) {
      alert("Game IS OVER!")
      return
    }
    if(game.board.isEmptyPos(pos)) {
      $square.addClass(this.game.currentPlayer);
      game.playMove(pos)
      if (game.isOver()){
        if(game.winner()) {
          alert(game.winner() + " whooped your ass!");
        }
        else {
          alert("Nobody won, you both suck!");
        }

      }
    }
    else {
      alert("That position is played, fool!")
    }

  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < 3; i++) {
      var $newRow = $("<div class='row' data-row=" + i +"></div>");
      this.board.append($newRow);
    };

    $('div.row').each( function () {
      for (var i = 0; i < 3; i++) {
        $(this).append("<div class='cell' data-col=" + i +"></div>");
      };
    });
  };
})();
