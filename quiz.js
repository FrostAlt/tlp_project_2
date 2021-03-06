
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
Quiz.ElementQuestionCounter = null;
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
        type: Quiz.QTYPE.TEXT,
        message: "What is Captain America's shield made from?",
        audio: "",
        options:
        [
            "Vibranium",
            "Virdanium",
            "Virilium",
            "Vitanium"
        ],
        answers:
        [
            "Vibranium",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which character does Bradley Cooper voice in the MCU?",
        audio: "",
        options:
        [
            "Rocket Racoon",
            "Groot",
            "Korg",
            "Howard the Duck"
        ],
        answers:
        [
            "Rocket Racoon",
            "Rocket"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which Hollywood A-lister made a cameo in Thor: Ragnarok playing Loki in an Asgardian play?",
        audio: "",
        options:
        [
            "Matt Damon",
            "Leonardo Dicaprio",
            "Johnny Depp",
            "Brad Pitt"
        ],
        answers:
        [
            "Matt Damon",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "In which film did Thanos make his first appearance?",
        audio: "",
        options:
        [
            "The Avengers",
            "Iron Man 2",
            "Guardians of the Galaxy",
            "Thor 2"
        ],
        answers:
        [
            "The Avengers",
            "Avengers"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "What country does Wanda Maximoff come from?",
        audio: "",
        options:
        [
            "Sokovia",
            "Slovinia",
            "Nokovia",
            "Varkonia"
        ],
        answers:
        [
            "Sokovia",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which character is known for the phrase \"I can do this all day\"?",
        audio: "",
        options:
        [
            "Steve Rogers",
            "Tony Stark",
            "Thor",
            "Peter Quill"
        ],
        answers:
        [
            "Steve Rogers",
            "Steve Grant Rogers",
            "Steven Rogers",
            "Steven Grant Rogers",
            "Captain America",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Which villian says the quote \"I am burdened with glorious purpose\"?",
        audio: "",
        options:
        [
            "Loki",
            "Thanos",
            "Ultron",
            "Killmonger"
        ],
        answers:
        [
            "Loki",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "In which movie was the iconic phrase \"Avengers assemble\" first heard?",
        audio: "",
        options:
        [
            "Avengers: End Game",
            "Avengers: Infinity War",
            "Avengers: Age of Ultron",
            "The Avengers"
        ],
        answers:
        [
            "Avengers: End Game",
            "End Game",
            "Avengers End Game",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "How many movies does Tony Stark appear in?",
        audio: "",
        options:
        [
            "10",
            "9",
            "8",
            "11"
        ],
        answers:
        [
            "10",
            "Ten"
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "Who provides the voice of Baby Groot?",
        audio: "",
        options:
        [
            "Vin Diesal",
            "Matt Damon",
            "Dwayne Johnson",
            "Idris Elba"
        ],
        answers:
        [
            "Vin Diesal",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "What is the only Marvel film to not have a post-credit scene?",
        audio: "",
        options:
        [
            "Avengers: End Game",
            "Avengers: Infinity War",
            "Captain Marvel",
            "Thor: Ragnarok"
        ],
        answers:
        [
            "Avengers: End Game",
            "End Game",
            "Avengers End Game",
        ]
    },
    {
        type: Quiz.QTYPE.TEXT,
        message: "What is the name of the microscopic universe Ant-Man travels to when he goes sub-atomic?",
        audio: "",
        options:
        [
            "Quantum Realm",
            "Nano Realm",
            "Subatomic Realm",
            "Diminutive Realm"
        ],
        answers:
        [
            "Quantum Realm",
            "Quantum",
            "Quantum Universe",
        ]
    },
    
    // Audio
    {
        type: Quiz.QTYPE.AUDIO,
        message: "Which character does the following musical sting represent?",
        audio: "./audio/quiz_audio_1.mp3",
        options:
        [
            "Spider-Man",
            "Iron Man",
            "Thor",
            "Captain America"
        ],
        answers:
        [
            "Spider-Man",
            "Spiderman",
            "Spider Man"
        ]
    },
    {
        type: Quiz.QTYPE.AUDIO,
        message: "Which character does the following musical sting represent?",
        audio: "./audio/quiz_audio_2.mp3",
        options:
        [
            "Captain Marvel",
            "Captain America",
            "Thor",
            "Iron Man"
        ],
        answers:
        [
            "Captain Marvel",
        ]
    },
    {
        type: Quiz.QTYPE.AUDIO,
        message: "Which character does the following musical sting represent?",
        audio: "./audio/quiz_audio_3.mp3",
        options:
        [
            "Ant Man",
            "Shang-Chi",
            "Thor",
            "Spider-Man"
        ],
        answers:
        [
            "Ant Man",
            "Antman",
            "Ant-man",
        ]
    },
    {
        type: Quiz.QTYPE.AUDIO,
        message: "Which character does the following musical sting represent?",
        audio: "./audio/quiz_audio_4.mp3",
        options:
        [
            "Captain America",
            "Thor",
            "Hulk",
            "Black Panther"
        ],
        answers:
        [
            "Captain America",
            "Steve Rogers",
            "Steve Grant Rogers",
            "Steven Rogers",
            "Steven Grant Rogers",
        ]
    },
    {
        type: Quiz.QTYPE.AUDIO,
        message: "Which character does the following musical sting represent?",
        audio: "./audio/quiz_audio_5.mp3",
        options:
        [
            "Iron Man",
            "Thor",
            "Hulk",
            "Captain America"
        ],
        answers:
        [
            "Iron Man",
            "IronMan",
            "Iron-Man",
            "Tony Stark",
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
    // if (Quiz.currentQuestionIndex >= Quiz.questions.length-1)
    if (Quiz.currentQuestionIndex >= 10)
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

Quiz.SubmitAnswerClickCallback = (e)=>
{
    const input = (/**@type {HTMLInputElement}*/(Quiz.ElementArea.querySelector("#QuizInput")));
    const answer = input.value;
    if (answer.trim() === "")
    {
        // Don't do anything on empty input
        return;
    }
    if (Quiz.IsAnswerCorrect(answer))
    {
        input.style.backgroundColor = "var(--quiz-correct-color)";
        Quiz.CorrectQuestions++;
    }
    else
    {
        input.style.backgroundColor = "var(--quiz-incorrect-color)";
    }
    DisableGameElement(Quiz.ElementArea.querySelector("#QuizInputSubmit"));
    EnableGameElement(Quiz.ElementNextButton);
};

Quiz.ShowStats = ()=>
{
    // End of questions. Show stats.
    // This is a test, replace with element set up.
    const testStats = CreateGameElement("QuizStats");
    testStats.textContent = "Quiz Complete!";
    const statPercent = CreateGameElement("QuizStatsPercent",GAME_ELEMENT_TYPE.DEFAULT,testStats);
    const statAnswered = CreateGameElement("QuizStatsAnswered",GAME_ELEMENT_TYPE.DEFAULT,testStats);
    const percent = Math.floor((Quiz.CorrectQuestions / 10) * 100);
    statPercent.textContent = `${percent}%`;
    statAnswered.textContent = `${Quiz.CorrectQuestions} / 10`;
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
    Quiz.ElementQuestionCounter = CreateGameElement("QuizQuestionCounter", GAME_ELEMENT_TYPE.DEFAULT, Quiz.ElementArea);
    Quiz.ElementMessage = CreateGameElement("QuizMessage", GAME_ELEMENT_TYPE.DEFAULT, Quiz.ElementArea);
    if (Difficulty === DIFFICULTY.HARD)
    {
        const inputArea = CreateGameElement("QuizInputContainer", GAME_ELEMENT_TYPE.DEFAULT, Quiz.ElementArea);
        CreateElement("input", "QuizInput", "", inputArea);
        const btn = CreateGameElement("QuizInputSubmit", GAME_ELEMENT_TYPE.BUTTON, inputArea);
        btn.textContent = "Submit";
        AddElementClickCallback(btn, Quiz.SubmitAnswerClickCallback);
    }
    else
    {
        for (let i = 0; i < 4; i++) {
            Quiz.ElementButtons[i] = CreateGameElement(`QuizButton${i}`, GAME_ELEMENT_TYPE.BUTTON, Quiz.ElementArea);
            Quiz.ElementButtons[i].classList.add("QuizOption");
            AddElementClickCallback(Quiz.ElementButtons[i], Quiz.OptionClickCallback);
        }
    }
    Quiz.ElementNextButton = CreateGameElement("QuizNextButton", GAME_ELEMENT_TYPE.BUTTON, Quiz.ElementArea);
    Quiz.ElementNextButton.textContent = "Next";
    AddElementClickCallback(Quiz.ElementNextButton, Quiz.NextClickCallback);
    DisableGameElement(Quiz.ElementNextButton);
};

Quiz.Play = ()=>
{
    // Temporary to get hard difficulty setup
    Quiz.Setup();
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
    Quiz.ElementQuestionCounter.textContent = `Question ${Quiz.currentQuestionIndex}/10`;
    Quiz.ElementMessage.textContent = document.createTextNode(question.message).textContent;
    if (question.type == Quiz.QTYPE.AUDIO)
    {
        const audio = new Audio(question.audio);
        audio.controls = true;
        Quiz.ElementMessage.appendChild(audio);
    }
    if (Difficulty === DIFFICULTY.HARD)
    {
        const input = (/**@type {HTMLInputElement}*/(Quiz.ElementArea.querySelector("#QuizInput")));
        input.value = "";
        input.style.backgroundColor = "initial";
        EnableGameElement(Quiz.ElementArea.querySelector("#QuizInputSubmit"));
    }
    else
    {
        for (let i = 0; i < question.options.length; i++) {
            const button = Quiz.ElementButtons[i];
            button.textContent = question.options[i];
            EnableGameElement(button);
            button.classList.remove("Fail");
            button.classList.remove("Success");
        }
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

