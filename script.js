class UserService {
    constructor (username, password) {
        this._username = username
        this._password = password
    }
    data() {
        return {user: this.username, password: this.password}
    }
    authenticate_user() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://example.com/api/user/authenticate', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        reject('Ошибка ' + xhr.status);
                    } else {
                        resolve(xhr.response);
                    }
                }
            };
            xhr.send(this.data());
        })
    }
}

$('form #login').click(function(event) {
    event.preventDefault();
    var username = $('#username').val()
    var password = $('#password').val()
    var obj = new UserService(username, password)
    obj.authenticate_user().then(
        response => document.location.href += '/home',
        err => alert(err)
    )
})