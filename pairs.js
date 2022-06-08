
class Pairs
{
}
Pairs.ROWS = 4;
Pairs.COLUMNS = 4;
Pairs.ElementArea = null;

Pairs.Symbols =
[
    "spoke",
    "circle",
    "landscape",
    "filter_vintage",
    "brightness_7",
    "savings",
    "storefront",
    "local_florist"
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
    ShuffleArray(Pairs.Symbols);
    let symbols = Pairs.Symbols.slice(0, Pairs.ROWS*2);
    // Multiply image count
    symbols = symbols.concat(symbols);
    // Shuffle again to randomize appearance
    for (let i = 0; i < 6; i++) {
        ShuffleArray(symbols);
    }

    Pairs.ElementArea = CreateGameElement("PairsContainer");
    for (let row = 0; row < Pairs.ROWS; row++) {
        const pairsContainerRow = CreateGameElement("", "PairsContainerRow", Pairs.ElementArea);
        for (let col = 0; col < Pairs.COLUMNS; col++) {
            const id = `${row}-${col}`;
            const b = Pairs.CreatePairBox(id, pairsContainerRow, symbols.pop());
            AddElementClickCallback(b, Pairs.BoxClickCallback);
        }
    }
};

Pairs.Play = ()=>
{
    ShowGameElement(Pairs.ElementArea);
};
