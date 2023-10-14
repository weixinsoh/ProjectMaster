import { toggleTheme } from "./util.js"

document.querySelectorAll('input[name="theme"]').forEach(radio => radio.addEventListener('change', () => {
    if (radio.checked) {
        console.log(radio.value)
        toggleTheme(radio.value)
        // update(ref(db, "users/" + username), {
        //     theme: theme
        // })
    }
}))
