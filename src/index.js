/* ------------------------------ */
/*  SIMPLE KEYBOARD INIT          */
/* ------------------------------ */
const Keyboard = window.SimpleKeyboard.default;
let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  newLineOnEnter: true,
  theme: "hg-theme-default hg-theme-ios",
  layout: {
    default: [
      "q w e r t y u i o p {bksp}",
      "a s d f g h j k l {enter}",
      "{shift} z x c v b n m , . {shift}",
      "{alt} {smileys} {space} {altright} {downkeyboard}"
    ],
    shift: [
      "Q W E R T Y U I O P {bksp}",
      "A S D F G H J K L {enter}",
      "{shiftactivated} Z X C V B N M , . {shiftactivated}",
      "{alt} {smileys} {space} {altright} {downkeyboard}"
    ],
    alt: [
      "1 2 3 4 5 6 7 8 9 0 {bksp}",
	`@ # $ & * ( ) { } ' " {enter}`,
      "{shift} % - + = / ; : ! ? {shift}",
      "{default} {smileys} {space} {back} {downkeyboard}"
    ],
    smileys: [
      "😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}",
      `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
      "😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {shift}",
      "{default} {smileys} {space} {altright} {downkeyboard}"
    ]
  },
  display: {
    "{alt}": ".?123",
    "{smileys}": "\uD83D\uDE03",
    "{shift}": "⇧",
    "{shiftactivated}": "⇧",
    "{enter}": "return",
    "{bksp}": "⌫",
    "{altright}": ".?123",
    "{downkeyboard}": "🞃",
    "{space}": " ",
    "{default}": "ABC",
    "{back}": "⇦"
  }
});

document.querySelector(".input").addEventListener("input", e => {
    keyboard.setInput(e.target.value);
});

function onChange(input) {
    document.querySelector(".input").value = input;
}

function onKeyPress(button) {
    if (button.includes("{")) handleLayout(button);
}

function handleLayout(button) {
    let current = keyboard.options.layoutName;
    let name;

    if (button === "{shift}" || button === "{shiftactivated}" || button === "{default}")
        name = current === "default" ? "shift" : "default";

    if (button === "{alt}" || button === "{altright}")
        name = current === "alt" ? "default" : "alt";

    if (button === "{smileys}")
        name = current === "smileys" ? "default" : "smileys";

    if (button === "{downkeyboard}") {
	window.open('', '_self', '');
	window.close();
    }

    if (name) keyboard.setOptions({ layoutName: name });
}

/* ------------------------------ */
/*  COPY BUTTON (COMPATIBILE)     */
/* ------------------------------ */
const copyButton = document.querySelector(".copy-btn");  
copyButton.addEventListener("click", () => {
    const text = document.querySelector(".input").value;
    if (text.length === 0) {
	return;
    }

    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    temp.setSelectionRange(0, 99999);

    document.execCommand("copy");
    document.body.removeChild(temp);

    copyButton.textContent = "Copied!";
    setTimeout(() => {
        copyButton.textContent = "Copy";
    }, 1000);
});

const clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener("click", () => {
    document.querySelector(".input").value = "";
    keyboard.clearInput();
});

/* ------------------------------ */
/*   REGISTER SERVICE WORKER      */
/* ------------------------------ */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js")
        .then(() => console.log("Service Worker registrato"))
        .catch(err => console.error("SW error:", err));
}
