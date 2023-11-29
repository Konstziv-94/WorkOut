$(".home-form").on("submit", (e) => {
  e.preventDefault();

  const email = $("#email").val().trim();

  const subject = $("#subject").val().trim();

  const text = $("#text").val().trim();

  const data = {
    email,
    subject,
    text,
  };

  $.post("/email", data)
    .then(() => {
      window.location.href = "/";
    })
    .catch(() => {
      window.location.href = "/error";
    });
});
document.addEventListener("DOMContentLoaded", () => {

  const $userName = document.querySelector('#username');
  const $password = document.querySelector("#password");
  const $email = document.querySelector("#email");
  const $age = document.querySelector("#age");
  const $btn = document.querySelector("#register-btn")


  const $errorMsgName = document.querySelector(".usernameError");
  const $succesMessageName = document.querySelector(".usernameSucces");
  const $errorPassword = document.querySelector(".passError");
  const $successPassword = document.querySelector(".passSuccess")
  const $errorEmail = document.querySelector(".emailError");
  const $succesEmail = document.querySelector(".emailSucces");
  const $errorAge = document.querySelector(".ageError");
  const $succesAge = document.querySelector(".ageSucces");
  
  $errorMsgName.classList.add("d-none");
  $succesMessageName.classList.add("d-none");
  $errorPassword.classList.add("d-none");
  $successPassword.classList.add("d-none");
  $errorEmail.classList.add("d-none");
  $succesEmail.classList.add("d-none");
  $errorAge.classList.add("d-none");
  $succesAge.classList.add("d-none");

  
  let nameIsValid = false;
  let passIsValid = false;
  let emailIsValid = false;
  let ageIsValid = false;


 

  //checkButton 
  const checkButton = () =>{
    if(emailIsValid && passIsValid && ageIsValid && nameIsValid ){
        $btn.disabled = false;
    }else{
      $btn.disabled = true;
    }

  }

  //username
  const getUserNameValidation = (username) =>{
    if (username.length < 4){
      nameIsValid = false;
      $errorMsgName.classList.remove("d-none");
      $succesMessageName.classList.add("d-none");
      $userName.classList.add("is-invalid");
    }else{
      nameIsValid = true;
      $errorMsgName.classList.add("d-none");
      $succesMessageName.classList.remove("d-none");
      $userName.classList.remove("is-invalid");
      $userName.classList.add("is-valid");
    }
  }

  $userName.addEventListener("input",(e)=>{
    const $value = e.target.value;
    // console.log($value);
    getUserNameValidation($value);
    checkButton();
  })

  //password

  const getPassValidation = (password) => {
    if(password.length > 4 && password !== ""){
        passIsValid = true;
    }else{
      passIsValid = false;
    }
    return passIsValid;
  }

  $password.addEventListener("input",(e)=>{
    
    const $valuePas = e.target.value;
   const passVal =  getPassValidation($valuePas);
    console.log(passVal);
    if(passIsValid){
      //true
      $password.classList.add("is-valid");
      $password.classList.remove("is-invalid")
      $errorPassword.classList.add("d-none");
      $successPassword.classList.remove("d-none");
    }else{
      //false
      $password.classList.remove("is-valid");
      $password.classList.add("is-invalid");
      $errorPassword.classList.remove("d-none");
      $successPassword.classList.add("d-none");
    }

    checkButton();
  })

  //email


  const getEmailValidation = (email) =>{
      if(email !== "" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        emailIsValid = true;
      }else{
        emailIsValid= false;
      }
      return emailIsValid;
  }

  $email.addEventListener("input",(e)=>{
   const $mail = e.target.value;
    getEmailValidation($mail);
    if (emailIsValid){
      //true
      $email.classList.add("is-valid");
      $email.classList.remove("is-invalid");
      $succesEmail.classList.remove("d-none");
      $errorEmail.classList.add("d-none");
    }else{
      $email.classList.remove("is-valid");
      $email.classList.add("is-invalid");
      $succesEmail.classList.add("d-none");
      $errorEmail.classList.remove("d-none");
    }

    checkButton();
  });

  
  //age


  const getAgeValidation = (age) => {
    if (age !== "" && (age > 18 && age < 80) ){
      ageIsValid = true;
    }else{
      ageIsValid = false;
    }
    return ageIsValid;
  }

  $age.addEventListener('input',(e)=>{
   const $ageValue = e.target.value;
    getAgeValidation($ageValue);
  
    if(ageIsValid){
      $age.classList.add("is-valid");
      $age.classList.remove("is-invalid");
      $succesAge.classList.remove("d-none");
      $errorAge.classList.add("d-none");
    }else{
      $age.classList.remove("is-valid");
      $age.classList.add("is-invalid");
      $succesAge.classList.add("d-none");
      $errorAge.classList.remove("d-none");
    }
    checkButton();
  });

 
 

});

// homepage contact form
document.addEventListener("DOMContentLoaded", () => {

  const $subject = document.querySelector("#subject");
  const $contactEmail = document.querySelector("#email");
  const $textContat = document.querySelector("#text");  
  const $contactBtn = document.querySelector("#contact-btn");
  

  const $errorSubject = document.querySelector(".subjectError");
  const $succesSubject = document.querySelector(".subjectSucces");
  const $errorEmailCont = document.querySelector(".emailContError");
  const $succesEmailCont = document.querySelector(".emailContSucces");
  const $textSucces = document.querySelector(".textSucces");
  const $textError = document.querySelector(".textError")

  $errorSubject.classList.add("d-none");
  $succesSubject.classList.add("d-none");
  $errorEmailCont.classList.add("d-none");
  $succesEmailCont.classList.add("d-none");
  $textError.classList.add("d-none");

  let subjectIsValid = false;
  let emailContIsValid = false;
  let textIsValid = false;

  function checkBtnValid (){
    if (subjectIsValid && emailContIsValid && textIsValid){
      $contactBtn.disabled = true;
    }else{
      $contactBtn.disabled = false;
    }
  };

 function getSubjectValidation (subject) {
   if (subject !== '' && subject.length < 4){
     subjectIsValid= true;
   }else{
     subjectIsValid =false;
   }
 }

  $subject.addEventListener("input" , (e) =>{
    const  $subValue = e.target.value;
      console.log($subValue);
     getSubjectValidation($subValue);
      if (!subjectIsValid){
        $subject.classList.add("is-valid");
        $subject.classList.remove("in-invalid");
        $errorSubject.classList.add("d-none");
        $succesSubject.classList.remove("d-none")
      }else{
        $subject.classList.remove("is-valid");
        $subject.classList.add("in-invalid");
        $errorSubject.classList.remove("d-none");
        $succesSubject.classList.add("d-none")
      }
      checkBtnValid();
    });

    const getEmailContValidation = (email) =>{
      if(email !== "" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        emailContIsValid = true;
      }else{
        emailContIsValid= false;
      }
      return emailContIsValid;
  }

  $contactEmail.addEventListener("input",(e)=>{
   const $mailCont = e.target.value;
    getEmailContValidation($mailCont);
    if (emailContIsValid){
      //true
      $contactEmail.classList.add("is-valid");
      $contactEmail.classList.remove("is-invalid");
      $succesEmailCont.classList.remove("d-none");
      $errorEmailCont.classList.add("d-none");
    }else{
      $contactEmail.classList.remove("is-valid");
      $contactEmail.classList.add("is-invalid");
      $succesEmailCont.classList.add("d-none");
      $errorEmailCont.classList.remove("d-none");
    }
    checkBtnValid();
  });

    let textValid = 250;
    $textSucces.innerHTML= `<p>Remaining characters ${textValid}</p>`
    

  $textContat.addEventListener("input",(e)=>{
   
    const $text = e.target.value;
    let $length = textValid - $text.length;
    if($length > 0 && $text !== ''){
      textIsValid = true;
      $textContat.classList.add("is-valid")
      $textContat.classList.remove("is-invalid")
      $textError.classList.add("d-none");
      
    }else{
      textIsValid = false;
      $textContat.classList.add("is-invalid")
      $textContat.classList.remove("is-valid")
      $textError.classList.remove("d-none");
      return;
    }
    $textSucces.innerHTML = `<p>Remaining characters ${$length}</p>`;
   
    console.log($text.length);
    checkBtnValid();
     
  })

  
});

