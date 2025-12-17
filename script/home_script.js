const leadState={
    name:false,
    email:false
}
document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("email")){
        window.location.href="/register.html"                
    }
    updateRequestBtn()
})
function updateRequestBtn(){
    document.getElementById("submit").disabled = !(
        leadState.name && leadState.email
    );
}
function onSubmitLeadDetails(event){
    event.preventDefault()
    const name=document.getElementById("name").value+""
    const email = document.getElementById("email").value+""
    const requirement = document.getElementById("requirement").value+""
    showLoader()
    fetch(AppConfig.url.google_sheet_leads, {
        method: "POST",
        body: JSON.stringify({
            name: name.trim(),
            email:email.trim(),
            requirement:requirement.trim()
        }),
        
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Request has been sent!");
            document.getElementById("contact_form").reset();
            Object.keys(leadState).forEach(k => leadState[k] = false);
            document.getElementById("errors").innerText = "";
            updateRequestBtn();
        }
    })
    .catch(err => {
        console.log(err);
        
        document.getElementById("errors").innerText = "Submission failed!";
    })
    .finally(()=>hideLoader());

}
function onEmailChange(val){
    let label = document.getElementById("email_error")
    let input = document.getElementById("email")
    if(!val){
        label.innerText="Email is required"
        input.style.borderColor = "red"
        leadState.email=false
        return
    }
    if(!AppConfig.regex.email.test(val+"")){
        label.innerText="Email must be company email"
        input.style.borderColor = "red"
        leadState.email=false
    }else{
        label.innerText=""
        input.style.borderColor = "#f0ffff"
        leadState.email=true
    }
    updateRequestBtn()
}
function onNameChange(val){
    let input = document.getElementById("name")
    let label = document.getElementById("name_error")
    if(!val){
        label.innerText="Name is required"
        input.style.borderColor="red"
        leadState.name=false
        return
    }
    if(!AppConfig.regex.name.test(val)){
        label.innerText="Name is not valid"
        input.style.borderColor="red"
        leadState.name=false
    }else {
        label.innerText=""
        input.style.borderColor="azure"
        leadState.name=true
    }
    updateRequestBtn()
}
function onRequirementChange(val){

}
function onLogout(){
    showLoader()
    localStorage.removeItem("email");
    
    window.location.href="/register.html"
    hideLoader()
    window.location.reload()

}
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}
window.addEventListener("load", () => {
        document.getElementById("loader").style.display = "none";
});

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

