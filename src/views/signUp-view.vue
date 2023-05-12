<template>
    <div class="registration">
            <h1>Регистрация</h1>
            <div class="block__registration">
                <input class="login" type="text" ref="login" placeholder="Логин">
                <input class="password" type="password" ref="password" placeholder="Пароль">
                <input class="confirm__password" type="password" ref="confirmPassword" placeholder="Подтверждение пароля">
                <button class="sign__up" @click="signUp()">Зарегистрироваться</button>
            </div> 
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: "SignUp",
    components: {

    },
    methods: {
        async signUp() {
            try {
                let login = this.$refs.login.value;
                let password = this.$refs.password.value;
                let confirmPassword = this.$refs.confirmPassword.value;

                if (password != confirmPassword) {
                    alert("Пароли не совпадают");

                    return;
                }

                let dto = {
                    Name: login,
                    Password: password
                };

                await axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "/users/signUp",
                    data: dto
                }).then((response) => response).catch((error) => {
                    alert("Ошибка при создании аккаунта. " + error.response.data);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>


<style lang="scss" scoped>

.registration {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        text-align: center;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        color: #AFCFF9;        
    }

    .block__registration{
        align-items: center;
        padding: 50px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        background-color: #EFEFEF;
        border-radius: 50px;
        width: 35%;
        height: 360px;
    }

     .login, .password, .confirm__password{
        border-radius: 15px;
        border-width: 0px;
        height: 72px;
        width: 80%;
        background-color: #B9BABC;
        text-align: center;
        font-weight: bold;
        font-size: medium;
    }

    .sign__up{
        cursor: pointer;
        border-radius: 15px;
        border-width: 0px;
        height: 36px;
        width: 40%;;
        background-color: #72C850;
        font-weight: bold;
        font-size: medium;
        
    } 

    .sign__up:hover {
            background-color: #ECA587;
        }
}

</style>