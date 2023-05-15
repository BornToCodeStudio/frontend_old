<template>
    <div class="registration">
            <h1>Регистрация</h1>
            <div class="block__registration">
                <input class="login" type="text" ref="login" placeholder="Логин">
                <input class="password" type="password" ref="password" placeholder="Пароль">
                <input class="confirm__password" type="password" ref="confirmPassword" placeholder="Подтверждение пароля">
                <div class="sign__up" @click="signUp()">Зарегистрироваться</div>
            </div> 
    </div>
</template>

<script>
import axios from '../axios/index.js';

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

                this.$store.state.loader = true;

                await axios({
                    method: 'post',
                    url: "/users/signUp",
                    data: dto
                }).then((response) => response).finally(() => {
                    alert("Вы успешно создали аккаунт. Теперь авторизуйтесь");
                }).catch((error) => {
                    alert("Ошибка при создании аккаунта. " + error.response.data);
                });

                this.$store.state.loader = false;
            } catch (error) {
                console.log(error);
                this.$store.state.loader = false;
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
        color: #FF570C;
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
        width: 40%;
        background-color: #72C850;
        font-weight: bold;
        font-size: medium;
        text-align: center;
        line-height: 36px;
    } 

    .sign__up:hover {
            background-color: #ECA587;
        }
}

</style>