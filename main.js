


// // ------------------------------start work with login modal after enter user and pass--------------------------
document.getElementById('log-in').addEventListener('click' , ()=>{

    const userName = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;
  
     const params ={
          "username":userName,
          "password":password,
    }
  
  
  // note that ==>firstly you must declare username and password in 'register' and call it by 'login'
  // our account is ==>eslam99  pass=>123456 

  getLoader(true)

    axios.post("https://tarmeezacademy.com/api/v1/login" , params)
    .then((response) =>{
      localStorage.setItem('token' , response.data.token);
      localStorage.setItem('user' ,JSON.stringify(response.data.user));
  
  //     // --------------------close modal after registrations----------------------------------

      let modal = document.getElementById('login-modal');
      let modalInstance =bootstrap.Modal.getInstance(modal)
      modalInstance.hide()

      userUi()
      showAlert(`welcome ${params.username} you logged in successfully` , 'success')
      getPosts()
  
    }).finally(()=>{
      getLoader(false)
    })
})

// // ------------------------------end work with login modal after enter user and pass--------------------------


// // ----------------------------------------function belong alert to tell user about status---------------------------

function showAlert(custommsg,customtype){
    const alertPlaceholder = document.getElementById('showAlert')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
    alert(custommsg, customtype)
}
// // ----------------------------------------end function belong alert to tell user about status---------------------------



// // ------------------------------function belong user when he logout-------------------------------------------
document.getElementById('log-out').addEventListener('click' , ()=>{

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    userUi()
    showAlert(`OK you logged out successfully` , 'danger')
    window.location =`index.html`
})

// // ------------------------------end function belong user when he logout-------------------------------------------


// // -----------------------------------function that will creat new user registers---------------------------------------------------

document.getElementById('sign-Up').addEventListener('click' ,signUpNewUser)

function signUpNewUser(){
    
    const userName = document.getElementById('reg-user-name').value;
    const password = document.getElementById('reg-password').value;
    const name = document.getElementById('reg-name').value;
  
      const params ={
           "username":userName,
           "password":password,
           "name" :name
     }
  
     getLoader(true)

    axios.post("https://tarmeezacademy.com/api/v1/register" , params)
    .then((response) =>{
      localStorage.setItem('token' , response.data.token);
      localStorage.setItem('user' ,JSON.stringify(response.data.user));
  
     // --------------------close modal after registrations----------------------------------
     let modal = document.getElementById('reg-modal');
     let modalInstance =bootstrap.Modal.getInstance(modal)
     modalInstance.hide()
  
     userUi()
    showAlert(`Hello ${params.name} you registered with us successfully` , 'success')
  


}).catch(error=>{
    showAlert(error.response.data.message,'danger')
}).finally(()=>{
  getLoader(false)
})
}


// // -----------------------------------end function that will creat new user---------------------------------------------------





// // --------------------------------------------function that return current user----------------------------------

function getCurrentUser(){
    let user  = null;
    let userStorage = localStorage.getItem('user');
    if(userStorage != null){
        user =JSON.parse(userStorage)
    }

    return user;
}




// ----------------------------------------------------strat loader functionality---------------------------------
// ----------------if i send it a false then make loader dispaled none--------------------------
function getLoader(show=true){
  let loader = document.getElementById('loader');
  if(show){
    loader.style.display = 'block';
  }else{
    loader.style.display = 'none';
  }
}
getLoader()











function userUi(){
  const token  =localStorage.getItem('token')
  // if usernot loged in
  if(token == null){

       document.getElementById('user-in').style.setProperty('display' , 'none' , 'important');
       document.getElementById('user-out').style.setProperty('display' , 'flex' , 'important');
       document.getElementById('main-content').style.setProperty('display' , 'none' , 'important'); 
       getLoader(true)       
  }else{

      const user = getCurrentUser()
      if(document.getElementById('profile-name') != null){

        document.getElementById('profile-name').innerHTML =user.name;
        document.getElementById('profile-email').innerHTML ="@"+ user.username;
      }

      document.getElementById('user-in').style.setProperty('display' , 'flex' , 'important');
      document.getElementById('user-out').style.setProperty('display' , 'none' , 'important');
      document.getElementById('main-content').style.setProperty('display' , 'block' , 'important'); 
  }
}
userUi()