window.onload = function () {
  const styleStatus = document.getElementById("styleToggle");

  if (localStorage.getItem("styleCoin") == 1) {
    styleStatus.setAttribute("href", "styles/modern.css");
  } else {
    styleStatus.setAttribute("href", "styles/fun.css");
  }
};

const toggleStyle = () => {
  const styleStatus = document.getElementById("styleToggle");

  if (
    localStorage.getItem("styleCoin") == 1 ||
    styleStatus.getAttribute("href") == "styles/modern.css"
  ) {
    styleStatus.setAttribute("href", "styles/fun.css");
    localStorage.setItem("styleCoin", 2);
  } else {
    styleStatus.setAttribute("href", "styles/modern.css");
    localStorage.setItem("styleCoin", 1);
  }
};