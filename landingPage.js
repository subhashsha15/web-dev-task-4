const signUp=()=>{
    const email=document.getElementById("email").value;
    localStorage.setItem("email", JSON.stringify(email));
    window.location.href="./signupPage/SignUp.html";
}