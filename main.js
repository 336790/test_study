let question_element = document.getElementById("question")
let questions_element = document.getElementById("questions")
let answer_element = document.getElementById("answer")
let not_right = document.getElementById("kaitou")
let subjects = document.getElementById("subjects")
let sub_options = document.querySelectorAll("#subjects option")
let time_chage = document.getElementById("time_change")
let time_options = document.querySelectorAll("#time_change option")
let time_limit = document.getElementById("time_limit")

answer_element.addEventListener("change",changeFunc);


const maru = new Audio('maru.mp3')
const batsu = new Audio('batsu.mp3')


let q_number;
let question_list;
let not_question_num;
let index;
let qs_state = false
let time_limit_num = 15000

time_chage.addEventListener("change" , () =>{
    time_limit_num=Number(time_options[time_chage.selectedIndex].id)*1000
})

subjects.addEventListener("change" , () =>{
    index = subjects.selectedIndex
    while (not_right.firstChild){not_right.removeChild(not_right.firstChild)};
    if (subjects.selectedIndex==0){
        qs_state = false
        console.log("off");
        return;
    }else {
        if (!qs_state){questions_element.classList.toggle("display_change")};
        qs_state = true
        console.log("on");
    };
    question_list = sub_question_list[sub_options[index].id]
    console.log(question_list,sub_options[index].id)
    not_question_num = [...Array(question_list.length/2).keys()].map((d) => {return d})
    random_question();
});

function Counter() {
    this.value;
}
let n;
Counter.prototype.start = () =>{n = setInterval(() =>{
    if (counter.value==0) {
        ;
    }else{
        time_limit.textContent = `${counter.value-1}秒`;
        console.log("titin")
        counter.value-=1;
    };
} , 1000)}
Counter.prototype.finish = () =>{clearInterval(n);console.log("clear")}
const counter = new Counter()

function changeFunc(e){
    ans = e.target.value
    console.log("ans : "+ans)
    maru.pause()
    maru.currentTime = 0
    batsu.pause()
    batsu.currentTime = 0
    answer_element.value=""

    if(question_list[q_number*2+1] == ans){
        maru.play()
        answer_element.value = ""
        counter.finish()
        random_question()
    }else{
        batsu.play()
    }
}

function random_question(){
    if (not_question_num.length>0){
        time_limit.textContent =  `${time_limit_num/1000}秒`
        counter.value = time_limit_num/1000
        rand = Math.floor(Math.random() * (not_question_num.length))
        console.log(not_question_num.length)
        qnum = not_question_num[rand]
        question_element.innerText = question_list[qnum*2]
        q_number = qnum;
        console.log(rand,qnum,not_question_num)
        counter.start()
    
        setTimeout(q_time_out,time_limit_num,qnum);
    
        not_question_num.splice(rand,1)
    }
}

function q_time_out(q_num){
    if (q_num==q_number){
        counter.finish()
        maru.pause()
        maru.currentTime = 0
        batsu.pause()
        batsu.currentTime = 0
        batsu.play()
        answer_element.value=""
        const p = document.createElement("p");
        p.innerText = String(question_list[qnum*2] + " : " + question_list[qnum*2+1] )
        p.classList.add("add")
        not_right.prepend(p)
        random_question()
    }
}
