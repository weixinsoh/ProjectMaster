// example 
const card = document.createElement("div")
card.classList.add("task-card") 
card.innerHTML = `
<p class="task-tags">
  123
</p>
<p class="task-tags">
  456
</p>
<p class="task-tags">
  789
</p>
`
document.getElementById("Username").appendChild(card);