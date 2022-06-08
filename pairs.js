
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

Pairs.CreatePairBox = (id, parent, image)=>
{
    const box = CreateGameElement(`PairsBox${id}`, GAME_ELEMENT_TYPE.BUTTON_STATIC, parent);
    box.classList.add("PairsBox");
    const boxInner = CreateGameElement("", "PairsBoxInner", box);
    const boxFront = CreateGameElement("", "PairsBoxFront", boxInner);
    const boxBack = CreateGameElement("", "PairsBoxBack", boxInner);
    const img = CreateElement("span",null,"material-symbols-outlined",boxBack);
    img.textContent = image;
    return box;
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
        }
    }
};

Pairs.Play = ()=>
{
    ShowGameElement(Pairs.ElementArea);
};
