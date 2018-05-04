$(document).ready(function () {

        var score = 0;

        var questionIndex = 0;

        var timer = 10;

        var intervalId;

        $("#show-timer").html("<h2> Seconds left: " + timer + "</h2>");

        var questions = [
            {
                q: "Is Real Madrid the best team in the world", a: "true"
            },
            {
                q: "Is the sky Blue?", a: "true"
            },
            {
                q: "Lightning never strikes in the same place twice", a: "false"
            },
            {
                q: "If you cry in space the tears just stick to your face", a: "true"
            },
            {
                q: "If you cut an earthworm in half, both halves can regrow their body", a: "false"
            },
            {
                q: "Humans can distinguish between over a trillion different smells", a: "true"
            },
            {
                q: "Adults have fewer bones than babies do", a: "true"
            },
            {
                q: "Napoleon Bonaparte was extremely short", a: "false"
            },
            {
                q: "Goldfish only have a memory of three seconds", a: "false"
            },
            {
                q: "There are more cells of bacteria in your body than there are human cells", a: "true"
            },

        ];


        function run() {
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }

        function decrement() {
            timer--;
            //  Show the number in the #show-number tag.
            $("#show-timer").html("<h2> Seconds left: " + timer + "</h2>");
            //  Once number hits zero...
            if (timer === 0) {
                //  ...run the stop function.
                stop();
                //  Alert the user that time is up.
                alert("Time Up!");
                questionIndex++;
                renderQuestion();
                timer = 10;
            }
        }

        function stop() {

            //  Clears our intervalId
            //  We just pass the name of the interval
            //  to the clearInterval function.
            clearInterval(intervalId);
        }

        $("#restart").click(function() {
            location.reload();
            
        });
    


        function renderQuestion() {
            // If there are still more questions, render the next one.
            if (questionIndex <= (questions.length - 1)) {
                run();
                document.querySelector("#question").innerHTML = questions[questionIndex].q;
            }
            // If there aren't, render the end game screen.
            else {
                document.querySelector("#question").innerHTML = "Game Over!";
                document.querySelector("#score").innerHTML = "Final Score: " + score + " out of " + questions.length;

            }
        }

        // Function that updates the score...
        function updateScore() {
            document.querySelector("#score").innerHTML = "Score: " + score;
        }

        // MAIN PROCESS
        // ==============================================================================

        // Calling functions to start the game.
        renderQuestion();
        updateScore();
        

        // When the user presses a key, it will run the following function...
        $("button").click(function(){

            // If there are no more questions, stop the function.
            if (questionIndex === questions.length) {
                return;
            }

            // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
            var clickValue = ($(this).attr("value"));
            

            // Only run this code if "t" or "f" were pressed.
            if (clickValue === "true" || clickValue === "false") {

                // If they guess the correct answer, increase and update score, alert them they got it right.
                if (clickValue === questions[questionIndex].a) {
                    alert("Correct!");
                    score++;
                    updateScore();
                    renderQuestion();
                    timer = 10;
                    stop();
                }
                // If wrong, alert them they are wrong.
                else {
                    alert("Wrong!");
                    renderQuestion();
                    timer = 10;
                    stop();
                }

                // Increment the questionIndex variable and call the renderQuestion function.
                questionIndex++;
                renderQuestion();
                run();
                // stop();

            }

        });
    });
