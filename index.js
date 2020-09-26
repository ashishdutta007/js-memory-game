document.addEventListener("DOMContentLoaded", () => {
  // game variables
  let choosenIds = [];
  let choosenCards = [];
  let disabledCardIds = [];
  let score = 0;

  // card options
  const imagesArray = [
    { src: "images/hotdog.png", name: "hotdog" },
    { src: "images/milkshake.png", name: "milkshake" },
    { src: "images/cheeseburger.png", name: "cheeseburger" },
    { src: "images/fries.png", name: "fries" },
    { src: "images/pizza.png", name: "pizza" },
    { src: "images/milkshake.png", name: "milkshake" },
    { src: "images/ice-cream.png", name: "ice-cream" },
    { src: "images/fries.png", name: "fries" },
    { src: "images/cheeseburger.png", name: "cheeseburger" },
    { src: "images/ice-cream.png", name: "ice-cream" },
    { src: "images/pizza.png", name: "pizza" },
    { src: "images/hotdog.png", name: "hotdog" },
  ];

  // create game board
  (function createGameBoardGrid() {
    const gameCards = imagesArray.map((item, index) => {
      const image = document.createElement("img");
      image.setAttribute("src", "images/blank.png");
      image.setAttribute("data-id", index);
      return image;
    });
    const gameContainer = document.querySelector(".grid");
    // appends NodeList to children
    gameContainer.append(...gameCards);
    // attach event listner at top level(delegation)
    gameContainer.addEventListener("click", flipCard);
  })();

  // check card matches
  function checkMatch() {
    const imagesElements = document.querySelectorAll("img");
    const selectedImageId1 = choosenIds[0];
    const selectedImageId2 = choosenIds[1];
    if (choosenCards[0] === choosenCards[1]) {
      // alert("matched");
      imagesElements[selectedImageId1].setAttribute("src", "images/white.png");
      imagesElements[selectedImageId2].setAttribute("src", "images/white.png");
      let scoreEl = document.querySelector("#score");
      score++;
      scoreEl.innerText = score;
      // disable click on matched cards
      disabledCardIds.push(...choosenIds);
    } else {
      imagesElements[selectedImageId1].setAttribute("src", "images/blank.png");
      imagesElements[selectedImageId2].setAttribute("src", "images/blank.png");
    }
    choosenCards.length = 0;
    choosenIds.length = 0;
  }

  // card click handler
  function flipCard(e) {
    e.stopPropagation();
    const flippedCard = e.target;
    const id = flippedCard.getAttribute("data-id");

    if (!disabledCardIds.includes(id)) {
      choosenIds.push(id);
      choosenCards.push(imagesArray[id].name);

      // flip to show the hidden image
      flippedCard.setAttribute("src", imagesArray[id].src);

      if (choosenIds.length === 2) {
        // if same card is clicked again
        if (choosenIds[0] === choosenIds[1]) {
          flippedCard.setAttribute("src", "images/blank.png");
          choosenCards.length = 0;
          choosenIds.length = 0;
        } else {
          console.log(choosenCards[0], choosenCards[1]);
          checkMatch();
        }
      }
    }
  }

  const reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    let imagesElements = document.querySelectorAll("img");
    imagesElements.forEach((image) => {
      image.setAttribute("src", "images/blank.png");
    });
    choosenIds = [];
    choosenCards = [];
    disabledCardIds = [];
    score = 0;
    document.getElementById("score").innerText = 0;
  });
});
