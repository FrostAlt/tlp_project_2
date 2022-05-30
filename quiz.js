
/**
 * @typedef {Object} question
 * @property {Quiz.QTYPE} type If the question is text or audio based. Audio questions can still have accompanying text.
 * @property {string} message The message displayed asking the question.
 * @property {string} audio
 * @property {string[]} options Four possible options for the player to select. These won't be displayed in hard difficulty.
 * @property {string[]} answers At least one must match the correct option exactly. Further answers can be given for leniency in hard mode.
 */

class Quiz
{
}

/**
 * @type {question}
 */
Quiz.currentQuestion = null;
/**
 * @type {number}
 */
 Quiz.currentQuestionIndex = 0;

/**
 * @type {HTMLDivElement}
 */
Quiz.ElementArea = null;
/**
 * @type {HTMLDivElement}
 */
Quiz.ElementMessage = null;
/**
 * @type {HTMLDivElement[]}
 */
Quiz.ElementButtons = [null,null,null,null];
/**
 * @type {HTMLDivElement}
 */
Quiz.ElementNextButton = null;

/**
 * @enum {number}
 */
Quiz.QTYPE =
{
    TEXT:  0,
    AUDIO: 2,
};

/**
 * @type {question[]}
 */
Quiz.questions =
[
    // Left here as template until snippet is created.
    // {
    //     type: QTYPE.TEXT,
    //     message: "",
    //     audio: "",
    //     options:
    //     [
    //         "Option 1",
    //         "Option 2",
    //         "Option 3",
    //         "Option 4"
    //     ],
    //     answers:
    //     [
    //         "Option 2",
    //     ]
    // },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Test message for test question 1 for test setup.",
        audio: "",
        options:
        [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        answers:
        [
            "Option 2",
        ]
    },
];

/**
 * Get if a given answer is correct for the current question.
 * @param {string} answer Answer that the player gave.
 * @returns {boolean}
 */
Quiz.IsAnswerCorrect = (answer)=>
{
    if (this.currentQuestion != null)
    {
        answer = answer.toLowerCase();
        for (const _answer of this.currentQuestion.answers)
        {
            if (_answer.toLowerCase() == answer) return true;
        }
    }
    return false;
};

Quiz.OptionClickCallback = (e)=>
{
    console.log(e.target);
    e.target.textContent = "SLKJDF";
};

/**
 * Creates elements needed for quiz but does not show them.
 * Use {@link Quiz.Play} to show elements.
 */
Quiz.Setup = ()=>
{
    Quiz.ElementArea = CreateGameElement("QuizContainer");
    Quiz.ElementMessage = CreateGameElement("QuizMessage", GAME_ELEMENT_TYPE.DEFAULT, Quiz.ElementArea);
    for (let i = 0; i < 4; i++) {
        Quiz.ElementButtons[i] = CreateGameElement(`QuizButton${i}`, GAME_ELEMENT_TYPE.BUTTON, Quiz.ElementArea);
        Quiz.ElementButtons[i].classList.add("QuizOption");
        Quiz.ElementButtons[i].addEventListener("click", Quiz.OptionClickCallback);
    }
    Quiz.ElementNextButton = CreateGameElement("QuizNextButton", GAME_ELEMENT_TYPE.BUTTON, Quiz.ElementArea);
    Quiz.ElementNextButton.textContent = "Next";
    DisableGameElement(Quiz.ElementNextButton);
};

Quiz.Play = ()=>
{
    ShuffleArray(Quiz.questions);
    Quiz.currentQuestionIndex = 0;
    Quiz.SetQuestion(Quiz.currentQuestionIndex);
    ShowGameElement(Quiz.ElementArea);
};

/**
 * Set a new question using an index.
 * All buttons are reset.
 * @param {number} index Index of question.
 */
Quiz.SetQuestion = (index)=>
{
    let question = Quiz.questions[index];
    Quiz.ElementMessage.textContent = document.createTextNode(question.message).textContent;
    for (let i = 0; i < question.options.length; i++) {
        const button = Quiz.ElementButtons[i];
        button.textContent = question.options[i];
        EnableGameElement(button);
        // Resetting class to remove styles.
        // Could be better to remove style classes instead of resetting.
        button.classList.remove("Fail");
        button.classList.remove("Success");
    }
};

Quiz.TestSetup = ()=>
{
    const area = CreateGameElement("QuizContainer");
    let question = Quiz.questions[0];
    // const elMessage = document.createElement("div");
    // const tMessage = document.createTextNode(question.message);
    // elMessage.appendChild(tMessage);
    const elMessage = CreateGameElement("QuizMessage", GAME_ELEMENT_TYPE.DEFAULT, area);
    elMessage.appendChild(document.createTextNode(question.message));
    let i = 1;
    for (const option of question.options) {
        // const elOption = document.createElement("")
        const b = CreateGameElement(`QuizButton${i}`, GAME_ELEMENT_TYPE.BUTTON, area);
        b.innerHTML = option;
        b.className = "QuizOption";
        i++;
    }
    ShowGameElement(area);
};

