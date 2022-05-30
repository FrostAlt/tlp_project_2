
class Pairs
{
}
Pairs.ROWS = 4;
Pairs.COLUMNS = 4;
Pairs.ElementArea = null;

Pairs.Setup = ()=>
{
    Pairs.ElementArea = CreateGameElement("PairsContainer");
    for (let row = 0; row < Pairs.ROWS; row++) {
        const pairsContainerRow = CreateGameElement("", "PairsContainerRow", Pairs.ElementArea);
        for (let col = 0; col < Pairs.COLUMNS; col++) {
            const id = `${row}-${col}`;
            const b = CreateGameElement(`PairsBox${id}`, GAME_ELEMENT_TYPE.BUTTON, pairsContainerRow);
            b.classList.add("PairsBox");
            b.textContent = id;
        }
    }
};

Pairs.Play = ()=>
{
    ShowGameElement(Pairs.ElementArea);
};
