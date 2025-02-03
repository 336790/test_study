let question_element = document.getElementById("question")
let answer_element = document.getElementById("answer")
let uncorrect_questoins_element = document.getElementById("kaitou")
let subject_option = document.getElementById("subjects")
let options = document.querySelectorAll("#subjects option");
answer_element.addEventListener("change",changeFunc);
subject_option.addEventListener("change" , () => {
    index = subject_option.selectedIndex
    if (subject_option.selectedIndex==0){return};
    question_list = sub_question_list[options[index].id]
    console.log(question_list,options[index].id)
    not_question_num = [...Array(question_list.length/2).keys()].map((d) => {return d})
    random_question();
});

const maru = new Audio('maru.mp3')
const batsu = new Audio('batsu.mp3')


let q_number;
let question_list;
let not_question_num;
let index;


function changeFunc(e){
    ans = e.target.value
    console.log("ans : "+ans)
    maru.pause()
    maru.currentTime = 0
    batsu.pause()
    batsu.currentTime = 0

    if(question_list[q_number*2+1] == ans){
        maru.play()
        answer_element.value = ""
        random_question()
    }else{
        batsu.play()
    }
}

function random_question(){
    if (not_question_num.length>0){
        rand = Math.floor(Math.random() * (not_question_num.length))
        console.log(not_question_num.length)
        qnum = not_question_num[rand]
        question_element.innerText = question_list[qnum*2]
        q_number = qnum;
        console.log(rand,qnum,not_question_num)
    
        setTimeout(q_time_out,8000,qnum);
    
        not_question_num.splice(rand,1)
    }
}

function q_time_out(q_num){
    if (q_num==q_number){
        maru.pause()
        maru.currentTime = 0
        batsu.pause()
        batsu.currentTime = 0
        batsu.play()
        uncorrect_questoins_element.innerHTML += question_list[qnum*2] + " : " + question_list[qnum*2+1] + "<br><br>"
        random_question()
    }
}