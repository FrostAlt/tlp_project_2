
class Pairs
{
}
/**
 * Number of pairs the player must find.
 * Should be an even number.
 * @type {number}
 */
Pairs.TotalPairs = 8;
Pairs.Rows = 4;
Pairs.Columns = 4;
/**
 * @type {HTMLDivElement}
 */
Pairs.ElementArea = null;

Pairs.SYMBOLS =
[
    "spoke",
    "circle",
    "landscape",
    "filter_vintage",
    "brightness_7",
    "savings",
    "storefront",
    "local_florist",
    "airware",
    "outlet",
    "pets",
    "coronavirus"
];

/**
 * @type {PairBox}
 */
Pairs.PreviousFlipped = null;
/**
 * @type {number}
 */
Pairs.PreviousChosenPairsCount = null;

Pairs.TotalPairFlips = 0;
Pairs.TotalMatchedFlips = 0;


/**
 * @typedef {HTMLDivElement & {image: String}} PairBox
 */

/**
 * 
 * @param {string} id 
 * @param {HTMLElement} parent 
 * @param {string} image 
 * @returns 
 */
Pairs.CreatePairBox = (id, parent, image)=>
{
    const box = (/**@type {PairBox}*/(CreateGameElement(`PairsBox${id}`, null, parent)));
    box.image = image;
    box.classList.add("PairsBox");
    const boxInner = CreateGameElement("", "PairsBoxInner", box);
    const boxFront = CreateGameElement("", GAME_ELEMENT_TYPE.BUTTON_STATIC, boxInner);
    boxFront.classList.add("PairsBoxFront");
    const boxBack = CreateGameElement("", "PairsBoxBack", boxInner);
    const img = CreateElement("span",null,"material-symbols-outlined",boxBack);
    img.textContent = image;
    return box;
};

Pairs.Win = ()=>
{
    Pairs.ElementArea.querySelectorAll(".PairsBoxBack").forEach(element => {
        element.classList.replace("flash","flash-twice");
    });
    const testScore1 = CreateElement("div","","PairsScoreContainerBack",Pairs.ElementArea);
    const testScore2 = CreateElement("div","","PairsScoreContainer",Pairs.ElementArea);
    const extraFlips = Pairs.TotalPairFlips - Pairs.TotalPairs;
    const score = extraFlips / (Pairs.TotalPairs * 2);
    let message;
    if (score >= 1) { message = "POOR ATTEMPT"; }
    else if (score >= 0.75) { message = "NOT GOOD"; }
    else if (score >= 0.50) { message = "AVERAGE"; }
    else if (score >= 0.25) { message = "GOOD"; }
    else if (score > 0.00) { message = "EXCELLENT"; }
    else { message = "PERFECT!\nNO WRONG MOVES"; }
    testScore2.textContent = `FINISHED IN\n${Pairs.TotalPairFlips} MOVES\n______________\n\n${message}`;
};

/**
 * 
 * @param {Object} e 
 * @param {HTMLElement} e.target
 */
Pairs.BoxClickCallback = (e)=>
{
    const box = (/**@type {PairBox}*/(e.target.parentElement.parentElement));
    DisableGameElement(box);
    box.classList.add("flipped");
    if (Pairs.PreviousFlipped)
    {
        console.log(e.target.classList);
        const image = box.image;
        const prevImage = Pairs.PreviousFlipped.image;
        console.log(`Image: '${image}', '${prevImage}'`);
        if (image == prevImage)
        {
            // Matched flip
            Pairs.TotalMatchedFlips++;
            const back = box.querySelector(".PairsBoxBack");
            const backPrev = Pairs.PreviousFlipped.querySelector(".PairsBoxBack");
            back.classList.add("flash");
            backPrev.classList.add("flash");
            console.log("Matched flip!");
            // Win condition
            if (Pairs.TotalMatchedFlips >= Pairs.TotalPairs)
            {
                Pairs.Win();
            }
        }
        else
        {
            // We cache this for the anonymous function because the field
            // is set to null afterwards.
            const prevFlipped = Pairs.PreviousFlipped;
            setTimeout(()=>{
                box.classList.remove("flipped");
                prevFlipped.classList.remove("flipped");
                EnableGameElement(box);
                EnableGameElement(prevFlipped);
            }, 1000);
            console.log("Unmatching flip");
        }
        Pairs.TotalPairFlips++;
        Pairs.PreviousFlipped = null;
    }
    else
    {
        Pairs.PreviousFlipped = box;
    }
};

Pairs.Setup = ()=>
{
    // Shuffle original array so we get random images regardless of square count
    ShuffleArray(Pairs.SYMBOLS);
    console.log(`Shuffling Pairs.SYMBOLS with length ${Pairs.SYMBOLS.length}`);
    let symbols = Pairs.SYMBOLS.slice(0, Pairs.TotalPairs);
    // Multiply image count
    symbols = symbols.concat(symbols);
    // Shuffle again to randomize appearance
    // Doesn't have to be repeated but I get better results
    for (let i = 0; i < 6; i++) {
        ShuffleArray(symbols);
    }

    Pairs.ElementArea = CreateGameElement("PairsContainer");
    for (let row = 0; row < Pairs.Rows; row++) {
        const pairsContainerRow = CreateGameElement("", "PairsContainerRow", Pairs.ElementArea);
        for (let col = 0; col < Pairs.Columns; col++) {
            const id = `${row}-${col}`;
            const b = Pairs.CreatePairBox(id, pairsContainerRow, symbols.pop());
            AddElementClickCallback(b, Pairs.BoxClickCallback);
        }
    }
};

const pairsMinWidthMatch = window.matchMedia("(min-width: 992px)");

Pairs.Play = ()=>
{
    // Should this change based on difficulty?
    //const n = 8;
    let counts = (Difficulty === DIFFICULTY.HARD ? [8,10,12] : [4,6]);
    // https://stackoverflow.com/a/3954451/15190248
    const index = counts.indexOf(Pairs.PreviousChosenPairsCount);
    console.log(counts);
    if (index !== -1) {
        console.log(`Removing ${index} ${counts[index]}`);
        counts.splice(index, 1);
    }
    console.log(counts);
    const n = counts[Math.floor(Math.random()*counts.length)];
    console.log(`Chose ${n}`);
    // Nearest even just for fun.
    const even = n % 2 == 0 ? n : n-1;
    Pairs.PreviousChosenPairsCount = n;
    // Clamp pairs just in case, avoid overflow.
    //                  No clamp func? Why??
    Pairs.TotalPairs = Math.min(Math.max(4, even), 12);
    const totalSquares = Pairs.TotalPairs * 2;
    // Roughly how many cols/rows
    const sqr = Math.sqrt(totalSquares);
    if (pairsMinWidthMatch.matches)
    {
        // Larger screens like desktop
        Pairs.Rows = 4;
        Pairs.Columns = Math.ceil(sqr*2)-4;
    }
    else
    {
        // Smaller screens like mobile
        // Always 4 columns for mobile so we can calculate left over rows
        Pairs.Columns = 4;
        Pairs.Rows = Math.ceil(sqr*2)-4;
    }

    // Resetting stats
    Pairs.PreviousFlipped = null;
    Pairs.TotalPairFlips = 0;
    Pairs.TotalMatchedFlips = 0;
    Pairs.Setup();
    // Consider unflipping boxes when switching from quiz
    ShowGameElement(Pairs.ElementArea);
};


