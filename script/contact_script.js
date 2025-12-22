const formState={
    name:false,
    email:false
}
function updateSubmitBtn(){
    document.getElementById("submit").disabled = !(
        formState.name && formState.email
    );
}

function onFormSubmit(event){
    event.preventDefault()
    const email = document.getElementById("email").value+""
    const name = document.getElementById("name").value+""
    const message = document.getElementById("message").value+""

    fetch(AppConfig.url.google_sheet_leads, {
        method: "POST",
        body: JSON.stringify({
            name: name.trim(),
            email:email.trim(),
            requirement:message.trim()
        }),
        
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("contactForm").reset();
            Object.keys(formState).forEach(k => formState[k] = false);
            document.getElementById("successMessage").style.display="flex"
        }
    })
    .catch(err => {
        console.log(err);
        document.getElementById("errors").innerText = "Submission failed!";
    })
    .finally(()=>{
        updateSubmitBtn()
        const formElements = document.querySelectorAll("#contactForm input, #contactForm select, #contactForm textarea");

        formElements.forEach(el => {
        el.style.border = "none"; 
        });
    });
}

function onEmailChange(val){
    let label = document.getElementById("emailError")
    let input = document.getElementById("email")
    if(!val){
        label.innerText="Email is required"
        input.style.borderColor = "red"
        formState.email=false
        return
    }
    if(!AppConfig.regex.email.test(val+"")){
        label.innerText="Email must be company email"
        input.style.borderColor = "red"
        formState.email=false
    }else{
        label.innerText=""
        input.style.borderColor = "#00ff26ff"
        formState.email=true
    }
    updateSubmitBtn()
}
function onNameChange(val){
    let input = document.getElementById("name")
    let label = document.getElementById("nameError")
    if(!val){
        label.innerHTML="Name is required"
        input.style.borderColor="red"
        formState.name=false
        return
    }
    if(!AppConfig.regex.name.test(val)){
        label.innerText="Name is not valid"
        input.style.borderColor="red"
        formState.name=false
    }else {
        label.innerText=""
        input.style.borderColor="#00ff26ff"
        formState.name=true
    }
    updateSubmitBtn()
}
function onMessageChange(val){

}