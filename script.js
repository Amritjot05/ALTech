/* ================= LOADER ================= */

window.addEventListener("load", function(){
const loader = document.querySelector(".loader");
if(loader){
loader.classList.add("hide");
}
});


/* ================= PROJECT FILTER ================= */

function filterProjects(category, event){
let cards = document.querySelectorAll(".project");

cards.forEach(card=>{
if(category === "all"){
card.style.display="block";
}else{
card.dataset.category === category
? card.style.display="block"
: card.style.display="none";
}
});

/* active button */
document.querySelectorAll(".filters button").forEach(btn=>{
btn.classList.remove("active");
});

if(event){
event.target.classList.add("active");
}
}


/* ================= SMOOTH PAGE TRANSITION ================= */

document.querySelectorAll("a").forEach(link=>{
link.addEventListener("click",function(e){

const target = this.getAttribute("href");

/* only animate internal html links */
if(target && target.includes(".html")){
e.preventDefault();

document.body.style.transition = "0.4s ease";
document.body.style.opacity = "0";
document.body.style.transform = "translateX(-60px)";

setTimeout(()=>{
window.location.href = target;
},400);
}

});
});

window.addEventListener("pageshow",()=>{
document.body.style.transition = "0.6s ease";
document.body.style.opacity = "1";
document.body.style.transform = "translateX(0)";
});


/* ================= HEADER HIDE ON SCROLL ================= */

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", ()=>{

if(!header) return;

const currentScroll = window.pageYOffset;

if(currentScroll > lastScroll && currentScroll > 100){
header.style.transform = "translateY(-100%)";
}else{
header.style.transform = "translateY(0)";
}

lastScroll = currentScroll;

});
function openPreview(card){
const img = card.querySelector("img").src;
document.getElementById("previewImg").src = img;
document.getElementById("imagePreview").classList.add("active");
}

function closePreview(){
document.getElementById("imagePreview").classList.remove("active");
}

/* ================= REVEALS / SHOWREEL ================= */

const showreel = document.querySelector(".showreel");
const reveals = document.querySelectorAll(".reveal");

if("IntersectionObserver" in window){
const observer = new IntersectionObserver((entries, obs)=>{
entries.forEach(entry=>{
if(!entry.isIntersecting) return;

const target = entry.target;

if(target.classList.contains("showreel")){
target.classList.add("visible");
}

if(target.classList.contains("reveal")){
target.classList.add("active");
}

obs.unobserve(target);
});
},{
threshold:0.18
});

if(showreel) observer.observe(showreel);
reveals.forEach(el=>observer.observe(el));

}else{
/* fallback for very old browsers */
window.addEventListener("scroll",()=>{
if(showreel && showreel.getBoundingClientRect().top < window.innerHeight - 100){
showreel.classList.add("visible");
}
reveals.forEach(el=>{
if(el.getBoundingClientRect().top < window.innerHeight - 100){
el.classList.add("active");
}
});
});
}
const words = [
"Delivering Precision.",
"Creating Immersive Spaces.",
"Shaping Architectural Stories."
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect(){
const typedText = document.getElementById("typed-text");

if(!typedText) return;

currentWord = words[i];

if(isDeleting){
typedText.textContent = currentWord.substring(0,j--);
}else{
typedText.textContent = currentWord.substring(0,j++);
}

if(!isDeleting && j === currentWord.length+1){
isDeleting = true;
setTimeout(typeEffect,1000);
return;
}

if(isDeleting && j === 0){
isDeleting = false;
i = (i+1) % words.length;
}

setTimeout(typeEffect, isDeleting ? 50 : 100);
}

document.addEventListener("DOMContentLoaded",typeEffect);