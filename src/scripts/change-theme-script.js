import { toggleTheme } from "./util.js"

const theme = localStorage.getItem("theme")

document.querySelectorAll('input[name="theme"]').forEach(radio => {
    if (theme == null && radio.value == "theme-default"){
        radio.checked = true
    }
    if (radio.value == theme){
        radio.checked = true
    }
})

document.querySelectorAll('input[name="theme"]').forEach(radio => radio.addEventListener('change', () => {
    if (radio.checked) {
        console.log(radio.value)
        toggleTheme(radio.value)
        localStorage.setItem("theme", radio.value)
        // update(ref(db, "users/" + username), {
        //     theme: theme
        // })
    }
}))


