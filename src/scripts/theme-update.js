import { toggleTheme } from "./util.js"

console.log(localStorage.getItem("theme"))
const theme = localStorage.getItem("theme")
theme == null ? toggleTheme("theme-default") : toggleTheme(theme)