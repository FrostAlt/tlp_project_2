/* jshint esversion: 11 */

function ToggleColorScheme(e)
{
    const icon = document.querySelector("#colorSchemeButtonIcon");
    if (document.body.classList.contains("dark"))
    {
        document.body.classList.remove("dark");
        icon.textContent = "dark_mode";
    }
    else
    {
        document.body.classList.add("dark");
        icon.textContent = "light_mode";
    }
}

/**
 * 
 * @enum {string}
 */
const GAME_ELEMENT_TYPE =
{
    DEFAULT: "",
    BUTTON: "GameElementButton",
};

/**
 * 
 * @returns {HTMLDivElement}
 */
function GetGameArea()
{
    // Should this be cached on DOM load?
    return document.querySelector("#GameArea");
}

/**
 * 
 * @param {string} id Unique ID of new element.
 * @param {string} [cls=GAME_ELEMENT_TYPE.DEFAULT] Default class of new element.
 * @param {HTMLElement} [parent] Optional parent to add to.
 * @return {HTMLDivElement}
 */
function CreateGameElement(id, cls, parent)
{
    const newElement = document.createElement("div");
    newElement.className = cls ?? GAME_ELEMENT_TYPE.DEFAULT;
    newElement.id = id;
    if (parent !== undefined)
    {
        parent.appendChild(newElement);
    }
    return newElement;
}

/**
 * @param {HTMLElement} element Element to show (created by {@link CreateGameElement}).
 */
function ShowGameElement(element)
{
    GetGameArea().appendChild(element);
}

/**
 * Disable a game element, especially a button.
 * @param {HTMLElement} element 
 */
function DisableGameElement(element)
{
    if (!element.classList.contains("disabled"))
    {
        element.classList.add("disabled");
    }
}
/**
 * Enable a game element, especially a button.
 * @param {HTMLElement} element 
 */
function EnableGameElement(element)
{
    if (element.classList.contains("disabled"))
    {
        element.classList.remove("disabled");
    }
}

 /**
  * 
  * @param {HTMLElement} element 
  * @param {function} callback 
  */
function AddElementClickCallback(element, callback)
{
    element.addEventListener("click", (e)=>{
        if (!element.classList.contains("disabled"))
        {
            callback(e);
        }
    });
}


// /**
//  * 
//  * @param {string} tag HTML tag of new element.
//  * @param {string} id Unique ID of new element.
//  * @param {HTMLElement} [parent] Parent element to append to.
//  * @return {HTMLElement}
//  */
// function CreateAndShowGameElement(tag, id, parent)
// {
//     const newElement = CreateGameElement(tag, id);
//     ShowGameElement(newElement, parent);
//     return newElement;
// }

function ClearGameArea()
{
    GetGameArea().innerHTML = "";
    // console.log("ClearGameArea is not defined!");
}

/**
 * Shuffle a given array in-place.
 * Found at {@link https://stackoverflow.com/a/12646864/15190248}
 * @param {any[]} array 
 */
function ShuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

(() => {
    console.log("Game ready.");
    console.log(`After load area ${document.querySelector("#GameArea")}`);
    document.querySelector("#colorSchemeButton").addEventListener("click", ToggleColorScheme);
    const playPairs = ()=>{
        ClearGameArea();
        Pairs.Play();
    };
    const playQuiz = ()=>{
        ClearGameArea();
        Quiz.Play();
    };
    document.querySelector("#playPairsButton").addEventListener("click", playPairs);
    document.querySelector("#playQuizButton").addEventListener("click", playQuiz);
    document.querySelector("#playPairsButtonStart").addEventListener("click", playPairs);
    document.querySelector("#playQuizButtonStart").addEventListener("click", playQuiz);

    // let gameSelector = CreateGameElement("GameSelector");
    // let gameSelectorQuizButton = CreateGameElement("GameSelectorQuizButton", GAME_ELEMENT_TYPE.BUTTON, gameSelector);
    // gameSelectorQuizButton.textContent = "QUIZ";
    // gameSelectorQuizButton.addEventListener("click", ()=>{
    //     ClearGameArea();
    //     Quiz.Play();
    // });
    // let gameSelectorPairsButton = CreateGameElement("GameSelectorPairsButton", GAME_ELEMENT_TYPE.BUTTON, gameSelector);
    // gameSelectorPairsButton.textContent = "PAIRS";
    // gameSelectorPairsButton.addEventListener("click", ()=>{
    //     ClearGameArea();
    //     Pairs.Play();
    // });
    // ShowGameElement(gameSelector);

    Pairs.Setup();
    Quiz.Setup();

    // Quiz.Play();
    // Quiz.ShowStats();
    // Quiz.TestSetup();
})();
