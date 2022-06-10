
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
            console.log("Matched flip!");
        }
        else
        {
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
    let symbols = Pairs.SYMBOLS.slice(0, Pairs.Rows*2);
    // Multiply image count
    symbols = symbols.concat(symbols);
    // Shuffle again to randomize appearance
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

var x = window.matchMedia("(min-width: 992px)");

Pairs.Play = ()=>
{
    // Should this change based on difficulty?
    const n = 8;
    // Nearest even just for fun.
    const even = n % 2 == 0 ? n : n-1;
    // Clamp pairs just in case, avoid overflow.
    //                  No clamp func? Why??
    Pairs.TotalPairs = Math.min(Math.max(4, even), 12);
    const totalSquares = Pairs.TotalPairs * 2;
    // Roughly how many cols/rows
    const sqr = Math.sqrt(totalSquares);
    if (x.matches)
    {
        Pairs.Rows = 4;
        Pairs.Columns = Math.ceil(sqr*2)-4;
    }
    else
    {
        // Always 4 columns for mobile so we can calculate left over rows
        Pairs.Rows = Math.ceil(sqr*2)-4;
        Pairs.Columns = 4;
    }

    // Resetting stats
    Pairs.PreviousFlipped = null;
    Pairs.TotalPairFlips = 0;
    Pairs.TotalMatchedFlips = 0;
    Pairs.Setup();
    // Consider unflipping boxes when switching from quiz
    ShowGameElement(Pairs.ElementArea);
};


