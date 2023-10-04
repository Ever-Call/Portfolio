export default function(){
  const main = document.querySelector('main')
  const root = document.querySelector(':root')
  if(main.dataset.theme === 'dark'){
    root.style.setProperty("--bg-color-dark", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color-light", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  }else{
    root.style.setProperty("--bg-color-dark", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color-light", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    main.dataset.theme = 'dark'
  }
}