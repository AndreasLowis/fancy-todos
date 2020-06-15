
const baseUrl = 'https://fancy-todoss.herokuapp.com'
let todoCurrentId = null

$( document ).ready(function() {
    auth()
})

function auth(){
    if( localStorage.token ){
        $('.login-page').hide()
        $('.home-page').show()
        $('.add-page').hide()
        $('.edit-page').hide()
        listTodo()
    } else {
        $('.login-page').show()
        $('.home-page').hide()
        $('.add-page').hide()
        $('.edit-page').hide()
    }
}

function home(){
    $('.login-page').hide()
    $('.home-page').show()
    $('.add-page').hide()
    $('.edit-page').hide()
}

function login(event){
    event.preventDefault()
    let username = $('#username').val()
    let password = $('#password').val()
    $.ajax({
        method: "post",
        url: baseUrl + "/users/login",
        data: {username, password}
    })
        .done((data)=>{
            localStorage.setItem('token', data.token)
            auth()
        })
        .fail(err =>{
            console.log(err.responseText)
            $('#alert').empty()
            $('#alert').append(`${err.responseText}`)
        })
        .always(()=>{
            $('#username').val('')
            $('#password').val('')
        })
}

function logout(){
    localStorage.clear()
    // localStorage.removeItem('token')
    auth()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function listTodo(){
    $.ajax({
        method: "get",
        url: baseUrl + "/todos",
        headers : {
            access_token: localStorage.token
        }
    })
        .done((data)=>{
            // console.log(JSON.stringify(data) + "ini data")
            $('.table-body').empty()
            data.forEach(todo => {
                $('.table-body').append(`
                <tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${todo.due_date.substr(0,10)}</td>
                    <td><button onclick="editTodoPage(${todo.id})">Edit</button>  </td>
                    <td><a href="" onclick="deleteTodo(event, ${todo.id})" >Delete</a></td>
                </tr>
                `)
            })
        })
        .fail(err =>{
            console.log(err.responseText + "error")
        })
}

function addTodoPage(){
    $('.home-page').hide()
    $('.add-page').show()
    $('.edit-page').hide()
}

function addTodo(event){
    event.preventDefault()
    let title = $('#title').val()
    let description = $('#description').val()
    let due_date = $('#due_date').val()
    console.log(title, description, due_date)
    $.ajax({
        method: "post",
        url: baseUrl + "/todos",
        headers : {
            access_token: localStorage.token
        },
        data: { title, description, due_date }
    })
        .done(()=>{
            home()
            listTodo()
        })
        .fail(err =>{
            console.log(err.responseText + "error")
        })
}

function deleteTodo(event, id){
    event.preventDefault()
    $.ajax({
        method: "delete",
        url: baseUrl + `/todos/${id}`,
        headers : {
            access_token: localStorage.token
        }
    })
        .done(()=>{
            listTodo()
        })
        .fail(err =>{
        console.log(err.responseText + "error")
        })
}

function editTodoPage(id){
    todoCurrentId = id
    $.ajax({
        method: "get",
        url: baseUrl + `/todos/${id}`,
        headers : {
            access_token: localStorage.token
        }
    })
        .done((data)=>{
            $('.home-page').hide()
            $('.add-page').hide()
            $('.edit-page').show()
            $('#title-edit').val(data.title)
            $('#description-edit').val(data.description)
            $('#status-edit').val(data.status)
            $('#due_date-edit').val(data.due_date.substr(0, 10))
        })
        .fail(err =>{
        console.log(err.responseText + "error") 
        })

}

function editTodo(event){
    event.preventDefault()
    let title = $('#title-edit').val()
    let description = $('#description-edit').val()
    let status = $('#status-edit').val()
    let due_date = $('#due_date-edit').val()
    $.ajax({
        method: "put",
        url: baseUrl + `/todos/${todoCurrentId}`,
        headers : {
            access_token: localStorage.token
        },
        data:{ title, description, status, due_date }
    })
        .done(()=>{
            home()
            listTodo()
        })
        .fail(err =>{
        console.log(err.responseText + "error")
        })
}


function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: baseUrl + '/users/googleSign',
        data: { id_token }
    })
        .done(({data})=>{
            console.log(data + "data googleSignIN");
            localStorage.setItem('token', data.access_token)
            auth()
        })
        .fail(err =>{
        console.log(JSON.stringify(err) + "error")
        })

}

function movieAPI() {
        event.preventDefault()
        let title = $('#title').val()
        let description = $('#description').val()
        let due_date = $('#due_date').val()
        console.log(title, description, due_date)
        $.ajax({
            method: "get",
            url: baseUrl + '/third-apis/movies',
            headers : {
                access_token: localStorage.token
            },
            data: { title, description, due_date }
        })
            .done(()=>{
                home()
                listTodo()
            })
            .fail(err =>{
                console.log(err.responseText + "error")
            })

}