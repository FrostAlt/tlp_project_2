
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

Quiz.CorrectQuestions = 0;

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
    // Snippet prefix: quiz_question, question
    {
        type: Quiz.QTYPE.TEXT,
        message: "What is Captain America's real name?",
        audio: "",
        options:
        [
            "Steve Rogers",
            "Steve Rangers",
            "Sam Rangers",
            "Sam Wallers"
        ],
        answers:
        [
            "Steve Rogers",
            "Steve Grant Rogers",
            "Steven Rogers",
            "Steven Grant Rogers"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which infinity stone did Thanos sacrifice his adopted daughter Gamora for?",
        audio: "",
        options:
        [
            "Soul stone",
            "Reality stone",
            "Mind stone",
            "Time stone"
        ],
        answers:
        [
            "Soul stone",
            "Soul",
            "The Soul stone"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which infinity stone gave Captain Marvel her powers?",
        audio: "",
        options:
        [
            "Space stone",
            "Power stone",
            "Reality stone",
            "Mind stone"
        ],
        answers:
        [
            "Space stone",
            "Space",
            "The Space stone"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "In Iron Man 2 what did Mickey Rourke's character (Whiplash) ask Stark's competitor Justin Hammer to retrieve from Russia?",
        audio: "",
        options:
        [
            "His bird",
            "His father",
            "His tools",
            "His blueprints"
        ],
        answers:
        [
            "His bird",
            "Irina",
            "bird",
            "his bird",
            "his bird irina",
            "cockatoo",
            "his cockatoo",
            "his pet cockatoo",
            "his pet irina"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which movie did Spiderman make his first appearance?",
        audio: "",
        options:
        [
            "Captain America: Civil War",
            "Spiderman: Homecoming",
            "Spiderman: Far From Home",
            "Avengers: Infinity War"
        ],
        answers:
        [
            "Captain America: Civil War",
            "Civil War",
            "Captain America Civil War"
        ]
    },
    {
        type: Quiz.QTYPE.AUDIO,
        message: "Which character does the following musical sting represent?",
        audio: "./audio/quiz_audio_1.mp3",
        options:
        [
            "Spiderman",
            "Iron Man",
            "Thor",
            "Captain America"
        ],
        answers:
        [
            "Spiderman",
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
    if (Quiz.currentQuestion != null)
    {
        answer = answer.toLowerCase();
        for (const _answer of Quiz.currentQuestion.answers)
        {
            if (_answer.toLowerCase() == answer) return true;
        }
    }
    return false;
};

/**
 * 
 * @param {Object} e 
 * @param {HTMLElement} e.target
 */
Quiz.OptionClickCallback = (e)=>
{
    if (Quiz.IsAnswerCorrect(e.target.textContent))
    {
        e.target.classList.add("Success");
        Quiz.CorrectQuestions++;
    }
    else
    {
        e.target.classList.add("Fail");
    }
    Quiz.ElementButtons.forEach(btn => {
        DisableGameElement(btn);
    });
    EnableGameElement(Quiz.ElementNextButton);
};

Quiz.NextClickCallback = (e)=>
{
    console.log(Quiz.currentQuestionIndex, Quiz.questions.length);
    if (Quiz.currentQuestionIndex >= Quiz.questions.length-1)
    {
        Quiz.ShowStats();
    }
    else
    {
        // Better to create Quiz.NextQuestion()?
        Quiz.currentQuestionIndex++;
        Quiz.SetQuestion(Quiz.currentQuestionIndex);
    }
};

Quiz.ShowStats = ()=>
{
    // End of questions. Show stats.
    // This is a test, replace with element set up.
    const testStats = CreateGameElement("QuizStats");
    testStats.textContent = "Quiz Complete!";
    const statPercent = CreateGameElement("QuizStatsPercent","",testStats);
    const statAnswered = CreateGameElement("QuizStatsAnswered","",testStats);
    const percent = Math.floor((Quiz.CorrectQuestions / Quiz.questions.length) * 100);
    statPercent.textContent = `${percent}%`;
    statAnswered.textContent = `${Quiz.CorrectQuestions} / ${Quiz.questions.length}`;
    ClearGameArea();
    ShowGameElement(testStats);
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
        AddElementClickCallback(Quiz.ElementButtons[i], Quiz.OptionClickCallback);
    }
    Quiz.ElementNextButton = CreateGameElement("QuizNextButton", GAME_ELEMENT_TYPE.BUTTON, Quiz.ElementArea);
    Quiz.ElementNextButton.textContent = "Next";
    AddElementClickCallback(Quiz.ElementNextButton, Quiz.NextClickCallback);
    DisableGameElement(Quiz.ElementNextButton);
};

Quiz.Play = ()=>
{
    Quiz.CorrectQuestions = 0;
    ShuffleArray(Quiz.questions);
    // Is this better done in Quiz.SetQuestion?
    for (const question of Quiz.questions) {
        ShuffleArray(question.options);
    }
    Quiz.currentQuestionIndex = 0;
    Quiz.SetQuestion(Quiz.currentQuestionIndex);
    Quiz.ElementNextButton.textContent = "Next";
    ShowGameElement(Quiz.ElementArea);
};

/**
 * Set a new question using an index.
 * All buttons are reset.
 * @param {number} index Index of question.
 */
Quiz.SetQuestion = (index)=>
{
    const question = Quiz.questions[index];
    Quiz.currentQuestion = question;
    Quiz.ElementMessage.textContent = document.createTextNode(question.message).textContent;
    if (question.type == Quiz.QTYPE.AUDIO)
    {
        const audio = new Audio(question.audio);
        audio.controls = true;
        Quiz.ElementMessage.appendChild(audio);
    }
    for (let i = 0; i < question.options.length; i++) {
        const button = Quiz.ElementButtons[i];
        button.textContent = question.options[i];
        EnableGameElement(button);
        button.classList.remove("Fail");
        button.classList.remove("Success");
    }
    // If at end of questions we can let player know by changing next text.
    if (index >= Quiz.questions.length-1)
    {
        Quiz.ElementNextButton.textContent = "Finish";
    }
    DisableGameElement(Quiz.ElementNextButton);
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

