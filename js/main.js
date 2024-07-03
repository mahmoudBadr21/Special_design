// check if there is local storage color option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty('--main-color', mainColor);

  // remove class active from all colrs list items
  document.querySelectorAll(".colors-list li").forEach(element =>{
    element.classList.remove("active");

    // add active class on element on data color === local syorage item
    if(element.dataset.color === mainColor){
      element.classList.add("active");
    };
    
  });
  
};

// random background option
let backgroundOption = true;

// variable to control the inteval
let backgroundInterval;

// chack if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

// chack if random background local storage is not emty
if(backgroundLocalItem !== null) {

  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  };

  // remove class active from all spans
  document.querySelectorAll(".random-backgrounds span").forEach(element =>{
    element.classList.remove("active");
  });

  // add class active on self
  if (backgroundLocalItem === 'true'){
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
};

// toggle spin class on icon
document.querySelector(".toggle-settings i").onclick = function () {
  // toggle class  fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch color
const colorLi = document.querySelectorAll(".colors-list li");

// loop on all list items
colorLi.forEach(li => {

  // click on every list items
  li.addEventListener("click", (e)=>{

    // set color on root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);

  });

});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop on all spans
randomBackEl.forEach(span => {

  // click on every list items
  span.addEventListener("click", (e)=>{

    handleActive(e);

    // set stuts of span in local storage
    if(e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// select landing page elemant
let landingPage = document.querySelector(".landing-page");

// get array of image
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

// function to randomize image
function randomizeImgs(){
  if (backgroundOption === true){
    backgroundInterval = setInterval(()=>{

    // get random number
    let randomNumber = Math.floor(Math.random() * imgArray.length);

    // change background image url
    landingPage.style.backgroundImage = 'url("imgs/' + imgArray[randomNumber] + '")';
    }, 5 * 1000);
  };
};
randomizeImgs();

// switch about us image
const aboutImage = document.querySelector(".about-us .image-box img");

// check if there is local storage image for section about us
if (mainColor !== null) {
  aboutImage.src = localStorage.getItem("aboutUsImg");
  // selectAboutImage();
}

// fubtion to change image in section about us when switch color option
function selectAboutImage(){

  // loop on all list items to change image in about us section
  colorLi.forEach(li =>{
    li.addEventListener("click", (e)=>{

      if (e.target.dataset.color === "#ff9800"){
        aboutImage.src = "imgs/about-us1.jpg";
        localStorage.setItem("aboutUsImg", "imgs/about-us1.jpg");
      };

      if (e.target.dataset.color === "#e91e63"){
        aboutImage.src = "imgs/about-us2.jpg";
        localStorage.setItem("aboutUsImg", "imgs/about-us2.jpg");
      };

      if (e.target.dataset.color === "#009688"){
        aboutImage.src = "imgs/about-us3.jpg";
        localStorage.setItem("aboutUsImg", "imgs/about-us3.jpg");
      };

      if (e.target.dataset.color === "#03a9f4"){
        aboutImage.src = "imgs/about-us4.jpg";
        localStorage.setItem("aboutUsImg", "imgs/about-us4.jpg");
      };

      if (e.target.dataset.color === "#4caf50"){
        aboutImage.src = "imgs/about-us5.jpg";
        localStorage.setItem("aboutUsImg", "imgs/about-us5.jpg");
      };
      
    });
  });
};
selectAboutImage();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

  // skills offset top
  var skillsOffsetTop = ourSkills.offsetTop;
  // console.log(skillsOffsetTop);

  // skills outer height
  var skillsOuterHeight = ourSkills.offsetHeight;
  // console.log(skillsOuterHeight);

  // window height
  var windowHeight = this.innerHeight;

  // window scrollTop
  var windowScrollTop = this.pageYOffset;

  if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill =>{

      skill.style.width = skill.dataset.progress;

    });

  };

};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e)=>{

    // create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to the body
    document.body.appendChild(overlay);

    // create the popuo box
    let popupBox = document.createElement("div");

    // add class to overlay
    popupBox.className = "popup-box";

    if(img.alt !== null) {

      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to popup box
      popupBox.appendChild(imgHeading);

    };

    // create the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);

    // add popup box to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement("span");

    // create the close button text
    let closeButtonText = document.createTextNode("X");

    // append text to the close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";
    
    // append close button to the popup box
    popupBox.appendChild(closeButton);

  });

});

// class popup
document.addEventListener('click', (e)=>{

  if(e.target.className == 'close-button'){

    // remove the current popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector('.popup-overlay').remove();

  };

});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomehere(elemants){

  elemants.forEach(ele => {

    ele.addEventListener('click', (e)=>{

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      });

    });

  });

};

scrollToSomehere(allLinks);
scrollToSomehere(allBullets);

// handle active state
function handleActive(ev){

  // remove class active from all childrens
  ev.target.parentElement.querySelectorAll(".active").forEach(element =>{

    element.classList.remove("active");

  });

  // add active class on self
  ev.target.classList.add("active");

};

// Bullets option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option")

if (bulletLocalItem !== null) {

  bulletsSpan.forEach(span => {
  
    span.classList.remove("active");
  
  });
  
  if (bulletLocalItem === "block") {
  
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  
  } else {
  
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  
  };

};

bulletsSpan.forEach(span =>{

  span.addEventListener('click', (e)=>{
  
    if(span.dataset.display === "show") {
    
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    
    } else {
    
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    
    };
    
    handleActive(e);
  
  });

});

// reset button
document.querySelector(".settings-box .reset-options").onclick = function () {

  // localStorage.clear();

  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("aboutUsImg");
  localStorage.removeItem("scroll-option");

  // reload window
  window.location.reload();

}

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  // stop propagation
  e.stopPropagation();

  // toggle class 'menu-active' on button
  this.classList.toggle('menu-active');

  // toggle class 'open' on links
  tLinks.classList.toggle('open');

};

// click anyhere outside menu and toggle button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {
  
    // chack if menuis open
    if (tLinks.classList.contains("open")) {

      // removclass 'menu-active' on button
      toggleBtn.classList.remove("menu-active");

      // remove class 'open' on links
      tLinks.classList.remove("open");

    };
  
  };

});

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
}

// fixed header when scroll
let fixedHeader = document.querySelector(".landing-page .container");
let scrollSpan = document.querySelectorAll(".scroll-header-option span");
let scrollLocal = localStorage.getItem("scroll-option");

if (scrollLocal !== null) {

  scrollSpan.forEach(span => {
  
    // to remove class active for all spans
    span.classList.remove("active");
  
  });
  
  if (scrollLocal === "yes") {
  
    window.onscroll = ()=>{
    
      // window scrollTop
      var windowScrollTop = this.pageYOffset;
    
      if(windowScrollTop < 50) {
    
        fixedHeader.classList.remove("scroll-active");
    
      } else {
    
        fixedHeader.classList.add("scroll-active");
    
      };
    
    };
    
    document.querySelector(".scroll-header-option .yes").classList.add("active");
  
  } else {
  
    fixedHeader.classList.remove("scroll-active");
    document.querySelector(".scroll-header-option .no").classList.add("active");
  
  };

};

// click on span
scrollSpan.forEach(span =>{

  span.addEventListener('click', (e)=>{
  
    if(span.dataset.scroll === "yes") {
    
      
      // when scroll
      window.onscroll = ()=>{
      
        // window scrollTop
        var windowScrollTop = this.pageYOffset;
      
        if(windowScrollTop < 50) {
      
          fixedHeader.classList.remove("scroll-active");
      
        } else {
      
          fixedHeader.classList.add("scroll-active");
      
        };
    
      };
      
      localStorage.setItem("scroll-option", "yes");
    
    } else {
    
      window.onscroll = ()=>{
      
        fixedHeader.classList.remove("scroll-active");
      
      };
      
      fixedHeader.classList.remove("scroll-active");
      
      localStorage.setItem("scroll-option", "no");
    
    };
    
    handleActive(e);
  
  });

});

// window.onload = ()=>{

//   localStorage.clear();

// }