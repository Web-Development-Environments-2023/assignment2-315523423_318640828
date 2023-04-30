
const wrapper = document.querySelector('.wrapper');
const loginMenu = document.querySelector('#btnLogin-popup');
const regMenu = document.querySelector('#btnReg-popup');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const exitLoginOrReg = document.querySelector('#icon-close');
const Homebtn = document.querySelector('#Home-popup');




// -------

window.imageEnemy1 = new Image()
window.imageEnemy1.src = 'images/enemy.png'
window.imageEnemy2 = new Image()
window.imageEnemy2.src = 'images/enemy_black.png'
window.imageEnemy3 = new Image()
window.imageEnemy3.src = 'images/enemy_white.png'
window.imageEnemy4 = new Image()
window.imageEnemy4.src = 'images/enemy_red.png'

// -------


Homebtn.addEventListener('click', () => {
	wrapper.classList.remove('active-popup');
	wrapper.classList.remove('config');
	wrapper.classList.remove('config');
});
//pop-up formBox for login & reg
registerLink.addEventListener('click', () => {
	wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
	wrapper.classList.remove('active');
});

loginMenu.addEventListener('click', () => {
	wrapper.classList.add('active-popup');
	wrapper.classList.remove('active');
});

exitLoginOrReg.addEventListener('click', () => {
	wrapper.classList.remove('active-popup');
	wrapper.classList.remove('config');
});

regMenu.addEventListener('click', () => {
	wrapper.classList.add('active-popup');
	wrapper.classList.add('active');
});

function AfterRegistration() {
	wrapper.classList.remove('active');
}

function AfterLogin() {
	wrapper.classList.remove('active');
	wrapper.classList.remove('active-popup');
	wrapper.classList.add('config');
}


let users = [];
let user = { userName: "p", password: "testuser" };
users.push(user);
localStorage.setItem('users', JSON.stringify(users));
function validation() {
	event.preventDefault();
	const firstName = document.getElementById("FirstName").value;
	const secondName = document.getElementById("SecondName").value;
	const email = document.getElementById("Email").value;
	const userName = document.getElementById("UserName").value;
	const password1 = document.getElementById("Password").value;
	const password2 = document.getElementById("PasswordAgain").value;

	const messageError = document.getElementById("error-message");
	const NoDigitPattern = /^[A-Za-z]+$/;
	const allowedpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


	if (!NoDigitPattern.test(firstName)) {
		messageError.textContent = "Please enter a valid first name with no digits.";
		return
	}
	else if (!NoDigitPattern.test(secondName)) {
		messageError.textContent = "Please enter a valid second name with no digits.";
		return
	}
	else if (!validEmail.test(email)) {
		messageError.textContent = "Invalid Email address";
		return
	}
	else if (!allowedpassword.test(password1)) {
		messageError.textContent = "Password should be at least 8 leanght with both digits and letters.";
		return
	}
	else if (password1 != password2) {
		messageError.textContent = "Passwords are not equal.";
		return
	}
	else {
		messageError.textContent = "";
		if (!insertNewUser(userName, password1))
			return
		AfterRegistration();
		return
	}
}
function insertNewUser(userName, password1) {
	let users = JSON.parse(localStorage.getItem('users')) || [];
	const newUser = { userName: userName, password: password1 };
	const usernameTaken = users.some(user => user.userName === newUser.userName);
	if (usernameTaken) {
		alert('Username is already taken');
		return false
	}
	users.push(newUser);
	localStorage.setItem('users', JSON.stringify(users));
	alert('User created successfully');
}
function checkLoginUser() {
	event.preventDefault();

	let users = JSON.parse(localStorage.getItem('users')) || [];
	let usernameEnter = document.getElementById("UserNameLogin").value;
	let passwordEnter = document.getElementById("PasswordLogin").value;
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		console.log(user.userName)

		if (user.userName === usernameEnter && user.password === passwordEnter) {
			alert("Welcome " + usernameEnter + "!");
			AfterLogin();
			return
		}
	}
	alert("Invalid username or password");

}



const openDialogButton = document.getElementById('About-popup');
const closeDialogButton = document.getElementById('close-dialog');
const dialog = document.getElementById('my-dialog');


// Open the dialog when the button is clicked
openDialogButton.addEventListener('click', () => {
	wrapper.classList.remove('active-popup');
	wrapper.classList.remove('active');
	wrapper.classList.remove('config');

	dialog.showModal();
});

// Close the dialog when the close button is clicked
closeDialogButton.addEventListener('click', () => {
	dialog.close();
});

dialog.addEventListener('click', (event) => {

	if (event.target === dialog || dialog.contains(event.target) === false) {
		dialog.close();
	}
});
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		dialog.close();
	}
});

let shootingKey = document.getElementById("ShootingKey").value;
let timeOftheGame = document.getElementById("TimeOftheGame").value;

function gameConfig() {
	event.preventDefault();
	shootingKey = document.getElementById("ShootingKey").value;
	timeOftheGame = document.getElementById("TimeOftheGame").value;

	if (isNaN(timeOftheGame))
		timeOftheGame = 2;
	localStorage.setItem('forTimer', timeOftheGame);

	if (!(isNaN(shootingKey) || shootingKey.value === " ")) {
		shootingKey = " ";
		localStorage.setItem('shootingK', shootingKey);
		alert("your weapon is 'space' key");
	}
	else
		localStorage.setItem('shootingK', shootingKey);
	alert("your weapon is the keyboard - " + shootingKey);
	redirectToPage("game_running.html")
}
function redirectToPage({ path }) {
	window.location.href = path;
}
