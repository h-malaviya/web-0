
document.addEventListener("DOMContentLoaded",()=>{
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("dob").setAttribute("max",today)
    updateSubmitState()
})
const formState={
    email:false,
    password:false,
    conf_pass:false,
    dob:false,
    tandc:false
}
function updateSubmitState() {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = !(
        formState.email &&
        formState.password &&
        formState.conf_pass &&
        formState.dob &&
        formState.tandc
    );
}
function register(event){
    event.preventDefault()
    if (!Object.values(formState).every(Boolean)) {
        return; 
    }
    const email = document.getElementById("email").value+""
    const password = document.getElementById("password").value+""
    const dob = document.getElementById("dob").value
    fetch(AppConfig.url.google_sheet, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            dob: dob
        }),
        
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Registration Successful!");
            document.getElementById("form1").reset();
            Object.keys(formState).forEach(k => formState[k] = false);
            updateSubmitState();
        }
    })
    .catch(err => {
        document.getElementById("errors").innerText = "Submission failed!";
    });
}

function onEmailChange(val){
    let label = document.getElementById("email_error")
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
        input.style.borderColor = "#faebd7"
        formState.email=true
    }
    updateSubmitState()
}

function onPasswordChange(val) {
    const label = document.getElementById("password_error");
    const input = document.getElementById("password");
    
    if (!val) {
        label.innerText = "Password is required";
        input.style.borderColor = "red";
        formState.password=false
        return;
    }
    const errors = [];

    if (val.length < AppConfig.regex.password.minLength) {
        errors.push("at least 8 characters");
    }
    if (!AppConfig.regex.password.lowercase.test(val)) {
        errors.push("one lowercase letter");
    }
    if (!AppConfig.regex.password.uppercase.test(val)) {
        errors.push("one uppercase letter");
    }
    if (!AppConfig.regex.password.digit.test(val)) {
        errors.push("one digit");
    }
    if (!AppConfig.regex.password.special.test(val)) {
        errors.push("one special character");
    }

    if (errors.length > 0) {
        label.innerText = "Password must contain " + errors.join(", ");
        input.style.borderColor = "red";
        formState.password=false
    } else {
        label.innerText = "";
        input.style.borderColor = "#faebd7";
        formState.password=true
    }
    updateSubmitState()
}
function onConfChange(val){
    let input = document.getElementById("conf-pass")
    let label = document.getElementById("conf_error")
    if(!val ){
        label.innerText="Confirm password is required"
        input.style.borderColor="red"
        formState.conf_pass=false
        return
    }
    const pass = document.getElementById("password").value+""
    if(pass != val){
        label.innerText="Confirm password is not matching with password"
        input.style.borderColor="red"
        formState.conf_pass=false
    } else {
        label.innerText = "";
        input.style.borderColor = "#faebd7";
        formState.conf_pass=true
    }
    updateSubmitState()
}
function onDobChange(val){
    const input = document.getElementById("dob");
    const label = document.getElementById("dob_error");

    if (!val || new Date(val) > new Date()) {
        label.innerText = "Please enter valid Date of Birth";
        input.style.borderColor = "red";
        formState.dob = false;
    } else {
        label.innerText = "";
        input.style.borderColor = "#faebd7";
        formState.dob = true;
    }
    updateSubmitState();
}

function onTandcChange(){
    formState.tandc = document.getElementById("tandc").checked  
    updateSubmitState()
}
