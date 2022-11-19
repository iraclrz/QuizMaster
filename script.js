//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");
const option_list = document.querySelector(".option_list");

//If Start Quiz Button Clicked
start_btn.onclick = ()=>{
	info_box.classList.add("activeInfo"); //show the info box
}
//If Exit Button Clicked
exit_btn.onclick = ()=>{
	info_box.classList.remove("activeInfo"); //hide the info box
}
//If Continue Button Clicked
continue_btn.onclick = ()=>{
	info_box.classList.remove("activeInfo"); //hide the info box
	quiz_box.classList.add("activeQuiz"); //show the quiz box
	showQuestions(0);
	queCounter(1);
	startTimer(30);
	startTimerLine(0);
}
let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 30;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz= result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
	quiz_box.classList.add("activeQuiz");
	result_box.classList.remove("activeResult");
	let que_count = 0;
	let que_numb = 1;
	let timeValue = 30;
	let widthValue = 0;
	userScore = 0;
	showQuestions(que_count);
	queCounter(que_numb);
	clearInterval(counter);
	startTimer(timeValue);
	clearInterval(counterLine);
	startTimerLine(widthValue);
	next_btn.style.display = "none";
	timeOff.textContent = "Time Left";
}

quit_quiz.onclick =()=>{
	window.location.reload();
}

//If Next Button Clicked
next_btn.onclick = () =>{
	if(que_count < questions.length - 1){
		que_count++;
		que_numb++;
		showQuestions(que_count);
		queCounter(que_numb);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		next_btn.style.display = "none";
		timeOff.textContent = "Time Left";
	}else{
		clearInterval(counter);
		clearInterval(counterLine);
		//console.log("Questions completed");
		showResultBox();
	}
}

//getting questions and options from Array
function showQuestions(index){
	const que_text = document.querySelector(".que_text");
	let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
	let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
					+ '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
					+ '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
					+ '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
	const option = option_list.querySelectorAll(".option");
	for (let i = 0; i < option.length; i++){
		option[i].setAttribute("onclick", "optionSelected(this)");
	}
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIcon); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    //next_btn.classList.add("show"); //show the next button if user selected any option
	next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 10){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 5){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

	
function startTimer(time){
	counter = setInterval(timer, 1000);
	function timer(){
		timeCount.textContent = time;
		time--;
		if (time < 9){
			let addZero = timeCount.textContent;
			timeCount.textContent = "0" + addZero;
		}
		if(time < 0){
			clearInterval(counter);
			timeCount.textContent = "00";
			timeOff.textContent = "Time Off";
			
			let correctAns = questions[que_count].answer;
			let allOptions = option_list.children.length;
			
			for (let i = 0; i < allOptions; i++){
				if(option_list.children[i].textContent == correctAns){
					option_list.children[i].setAttribute("class", "option correct");
					option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
					console.log("Time Off: Auto selected correct answer.");
				}
			}
			for (let i = 0; i < allOptions; i++){
				option_list.children[i].classList.add("disabled");
			}
			next_btn.style.display = "block";
		}
	}
}

function startTimerLine(time){
	counterLine = setInterval(timer, 58);
	function timer(){
		time += 1;
		timeLine.style.width = time + "px";
		if (time > 549){
			clearInterval(counterLine);
		}
	}
}


function queCounter(index){
	const bottom_ques_counter = quiz_box.querySelector(".total_que");
	let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>' + questions.length +'</p>Questions</span>';
	bottom_ques_counter.innerHTML = totalQuesCountTag;
}