//html要素を取得
let question_element = document.getElementById("question")
let questions_element = document.getElementById("questions")
let answer_element = document.getElementById("answer")
let not_right = document.getElementById("kaitou")
let subjects = document.getElementById("subjects")
let sub_options = document.querySelectorAll("#subjects option")
let time_chage = document.getElementById("time_change")
let time_options = document.querySelectorAll("#time_change option")
let time_limit = document.getElementById("time_limit")
let select_q_type = document.getElementById("q_type")
let display_q_number = document.getElementById("q_number")



//いろいろ定義
const maru = new Audio('maru.mp3')
const batsu = new Audio('batsu.mp3')

let q_number;
let question_list;
let not_question_num;
let index;
let qs_state = false
let time_limit_num = 15000
let q_type_state = false
let displayed_number = 1;
let result = {
    total:0,
    right:1,
    wrong:0
}
let finished =false;

//Counterクラス生成
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
//インスタンス化
const counter = new Counter()



//イベントリスナーたち
answer_element.addEventListener("change" , changeFunc);

time_chage.addEventListener("change" , () =>{
    time_limit_num=Number(time_options[time_chage.selectedIndex].id)*1000
})

subjects.addEventListener("change" , sub_change);

select_q_type.addEventListener("click" , () => {q_type_state=!q_type_state});



//メインの関数
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
        result.right++
    }else if(ans == "しね"){
        q_time_out(q_number)
    }else{
        batsu.play()
    }
}

function random_question(){
    if (not_question_num.length>0){
        time_limit.textContent =  `${time_limit_num/1000}秒`
        counter.value = time_limit_num/1000
        rand = q_type_state ?
             Math.floor(Math.random() * (not_question_num.length))
            :0
        console.log(not_question_num.length)
        qnum = not_question_num[rand]
        question_element.innerText = question_list[qnum*2]
        display_q_number.innerText = `第${displayed_number}問`
        q_number = qnum;
        console.log(rand,qnum,not_question_num)
        displayed_number++
        counter.start()

        setTimeout(q_time_out,time_limit_num,qnum);

        not_question_num.splice(rand,1)
    }else{
        if(!finished){
            finished = true
            display_q_number.innerText = "終了"
            question_element.innerText = `${result.total}問中 正解${result.right}問,不正解${result.wrong}...正答率${Math.floor(result.right/result.total*100)}%`
        }
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
        p.innerText = `第${String(displayed_number-1)}問 : ${String(question_list[q_num*2])}  答 ${String(question_list[qnum*2+1] )}`
        p.classList.add("add")
        not_right.prepend(p)
        result.wrong++
        random_question()
    }
}

function sub_change(){
    index = subjects.selectedIndex
    displayed_number = 1
    finished = false
    counter.finish()
    while (not_right.firstChild){not_right.removeChild(not_right.firstChild)};
    if (subjects.selectedIndex==0){
        console.log(index)
        qs_state = false
        console.log("off");
        return;
    }else {
        if (!qs_state){questions_element.classList.toggle("display_change")};
        qs_state = true
        console.log("on");
    };
    question_list = sub_question_list[sub_options[index].id]
    result = {
        total:question_list.length/2,
        right:0,
        wrong:0
    }
    console.log(question_list,sub_options[index].id)
    not_question_num = [...Array(question_list.length/2).keys()].map((d) => {return d})
    random_question();
};
