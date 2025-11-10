$(function() {
    const wordLevels = {
        "A1": [
            {en: "mother", ua: ["мати", "мама"]},
			{en: "father", ua: ["батько", "тато"]},
			{en: "brother", ua: ["брат"]},
			{en: "sister", ua: ["сестра"]},
			{en: "grandmother", ua: ["бабуся", "баба"]},
			{en: "grandfather", ua: ["дідусь", "дід"]},
			{en: "son", ua: ["син"]},
			{en: "daughter", ua: ["дочка", "донька"]},
			{en: "parents", ua: ["батьки"]},
			{en: "family", ua: ["родина", "сім’я"]}
			  ],
        "B1": [
            {en: "actor", ua: ["актор", "акторка"]},
			{en: "manager", ua: ["менеджер", "керівник"]},
			{en: "shop assistant", ua: ["продавець", "продавчиня"]},
			{en: "scientist", ua: ["вчений", "науковець"]},
			{en: "mechanic", ua: ["механік"]},
			{en: "pilot", ua: ["пілот"]},
			{en: "waiter", ua: ["офіціант"]},
			{en: "firefighter", ua: ["пожежник", "рятувальник"]},
			{en: "musician", ua: ["музикант"]},
			{en: "designer", ua: ["дизайнер"]}
			  ],
        "C1": [
            {en: "developer", ua: ["розробник"]},
			{en: "software", ua: ["програмне забезпечення"]},
			{en: "hardware", ua: ["обладнання", "залізо"]},
			{en: "application", ua: ["додаток", "застосунок"]},
			{en: "website", ua: ["вебсайт", "сайт"]},
			{en: "server", ua: ["сервер"]},
			{en: "database", ua: ["база даних"]},
			{en: "network", ua: ["мережа"]},
			{en: "debug", ua: ["налагоджувати", "усувати помилки"]},
			{en: "bug", ua: ["помилка", "баг"]}
			  ]
    };

    let shuffled = [];
    let current = 0;
    let correct = 0;
    let wrong = 0;
    const total = 10;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function nextWord() {
        if (current < shuffled.length && current < total) {
            $("#word").text(shuffled[current].en);
            $("#step").text(current + 1);
        } else {
            showResults();
        }
    }

    function showResults() {
        let level;
        const currentTotalQuestions = Math.min(total, shuffled.length);
        const percent = (correct / currentTotalQuestions) * 100;
        const currentLevel = $("#difficulty").val();

        if (percent >= 90) level = `Супер! Рівень ${currentLevel} підкорено! Далі – більше!`;
        else if (percent >= 70) level = `Добре, ти молодець! Допрацюй рівень ${currentLevel}.`;
        else if (percent >= 50) level = "Ти можеш набагато краще!";
        else level = "Потрібно більше практики! Все вийде в наступний раз!";

        $("#summary").html(`
            Ви переклали ${correct} із ${currentTotalQuestions} слів рівня ${currentLevel}!<br>
            Ваш результат: <b>${level}</b>
        `);
        $("#resultModal").fadeIn(400);
    }

    $("#checkBtn").click(function() {
        const $translationInput = $("#translation");
        const answer = $translationInput.val().trim().toLowerCase();

        if (answer === "") {
            alert("Будь ласка, введіть переклад! Не вийде обманути)");
            return;
        }

        if (current >= shuffled.length || current >= total) return;

        const correctAnswers = shuffled[current].ua.map(t => t.toLowerCase().trim());
        let isCorrect = correctAnswers.includes(answer);

        if (isCorrect) {
            correct++;
            $("#correct").text(correct);
        } else {
            wrong++;
            $("#wrong").text(wrong);
        }

        $translationInput.val("");

        current++;
        nextWord();
    });

    $("#restartBtn").click(function() {
        $("#resultModal").fadeOut(300, startGame);
    });

    $("#difficulty").on("change", function() {
        startGame();
    });

    function startGame() {
        const selectedLevel = $("#difficulty").val();
        const availableWords = wordLevels[selectedLevel] || [];

        shuffled = shuffle([...availableWords]).slice(0, total);

        current = 0;
        correct = 0;
        wrong = 0;

        $("#correct").text(0);
        $("#wrong").text(0);
        $("#total").text(Math.min(total, shuffled.length));
        $("#step").text(1);
        $("#translation").val("").focus();

        nextWord();
    }

    startGame();
});