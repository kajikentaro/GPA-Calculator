let text
const calc_GPA = ()=>{
const tr_list = document.querySelectorAll("table table table tr")
const tr_n = tr_list.length
let gpa_sum = 0
let unit_sum = 0
for(let i=0;i<tr_n;i++){
    const td_list = tr_list[i].querySelectorAll("td")
    if(!(td_list[1] && Number(td_list[1].innerText) > 0)){
        continue;
    }
    const unit = Number(td_list[1].innerText)
    const score = {A:4, B:3, C:2, D:1, E:0}
    for(let j=2;j<td_list.length;j++){
        const alphabet = td_list[j].innerText.replace(/\s+/g, "")
        if(!alphabet)continue
        if(score[alphabet] == undefined)continue
        if(td_list[j].black_list){
            td_list[j].style.backgroundColor = "#fff"
            continue
        }
        gpa_sum += score[alphabet] * unit
        unit_sum += unit
        td_list[j].style.backgroundColor = "#349aff"
        td_list[j].black_list = false
        td_list[j].onclick = (e) => {
            e.target.black_list = !e.target.black_list
            calc_GPA()
        }
    }
}
text.innerHTML = `GPA: <span style='color:red'>${ gpa_sum / unit_sum }</span>`
}


const init = ()=>{
text = document.createElement("p")
text.innerText = "GPAを計算中"
text.style.fontSize = "30px"
text.style.fontWeight = "bold"
text.style.margin = "0"

const desc = document.createElement("p")
desc.innerText = "計算済みの成績が濃い青で表示されます。クリックで除外します(自由科目の除外を想定)"

const parent = document.createElement("div")
parent.style.margin = "20px 10px"
parent.appendChild(text)
parent.appendChild(desc)

const target = document.querySelector("table:nth-child(2) tr:nth-child(2) td:nth-child(2)")
target.style.textAlign = "left"
target.appendChild(parent)
calc_GPA()
}
//
if(document.querySelectorAll("td.navibar")[2].innerText.includes("学生向けサービス>>成績照会（評価確定）>成績の確認"))init()
