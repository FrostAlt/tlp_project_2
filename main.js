/* jshint esversion: 11 */

const DIFFICULTY =
{
    NORMAL: 1,
    HARD: 2
};
let Difficulty = DIFFICULTY.NORMAL;

/**
 * 
 * @param {Object} e 
 * @param {HTMLElement} e.currentTarget
 * @param {"on"|"off"} state
 */
function ToggleColorScheme(e, state)
{
    // const icon = document.querySelector("#colorSchemeButtonIcon");
    // if (document.body.classList.contains("dark"))
    if (state === "off")
    {
        document.body.classList.remove("dark");
        // icon.textContent = "dark_mode";
    }
    else
    {
        document.body.classList.add("dark");
        // icon.textContent = "light_mode";
    }
}

/**
 * 
 * @param {Object} e 
 * @param {HTMLElement} e.currentTarget
 * @param {"on"|"off"} state
 */
 function ToggleDifficulty(e, state)
 {
    // const icon = document.querySelector("#colorSchemeButtonIcon");
    if (state === "off")
    {
        Difficulty = DIFFICULTY.NORMAL;
    }
    else
    {
        Difficulty = DIFFICULTY.HARD;
    }
    console.log(`Difficulty: ${Difficulty}`);
 }

/**
 * 
 * @enum {string}
 */
const GAME_ELEMENT_TYPE =
{
    DEFAULT: "",
    BUTTON: "GameElementButton",
    BUTTON_STATIC: "GameElementButton static",
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
 * @param {string} tag Tag type for element.
 * @param {string} id Unique ID of new element.
 * @param {string} [cls=GAME_ELEMENT_TYPE.DEFAULT] Default class of new element.
 * @param {HTMLElement} [parent] Optional parent to add to.
 * @return {HTMLElement}
 */
function CreateElement(tag, id, cls, parent)
{
    const newElement = document.createElement(tag);
    newElement.className = cls;
    newElement.id = id;
    if (parent !== undefined)
    {
        parent.appendChild(newElement);
    }
    return newElement;
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
    // Possible for function to return generic?
    return (/**@type{HTMLDivElement}*/(CreateElement("div", id ?? "", cls ?? GAME_ELEMENT_TYPE.DEFAULT, parent)));
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
 * @callback GameElementCallback
 * @param {MouseEvent & { target: HTMLElement }} e
 * @param {"on"|"off"|undefined} toggleState
 */

 /**
  * 
  * @param {HTMLElement} element 
  * @param {function} callback 
  */
function AddElementClickCallback(element, callback)
{
    
    element.addEventListener("click",
        // No idea how to document this, google doesn't help
        (e)=>{
        if (!element.classList.contains("disabled"))
        {
            let state;
            //@ts-ignore
            if (e.currentTarget.classList.contains("icon-flip"))
            {
                //@ts-ignore
                state = IconFlipHandler(e);
            }
            callback(e, state);
        }
    });
}

/**
 * 
 * @param {Object} e 
 * @param {HTMLElement} e.currentTarget
 * @returns {"on"|"off"}
 */
function IconFlipHandler(e)
{
    const icon = e.currentTarget;
    if (icon.classList.contains("icon-flip-on"))
    {
        console.log("Turning off icon flip button");
        icon.classList.replace("icon-flip-on","icon-flip-off");
        return "off";
    }
    else
    {
        console.log("Turning on icon flip button");
        if (icon.classList.contains("icon-flip-off"))
        {
            icon.classList.replace("icon-flip-off","icon-flip-on");
        }
        else
        {
            icon.classList.add("icon-flip-on");
        }
        return "on";
    }
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
    //@ts-ignore
    // document.querySelector("#colorSchemeButton").addEventListener("click", ToggleColorScheme);
    AddElementClickCallback(document.querySelector("#colorSchemeButton"), ToggleColorScheme);
    AddElementClickCallback(document.querySelector("#difficultyButton"), ToggleDifficulty);
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
