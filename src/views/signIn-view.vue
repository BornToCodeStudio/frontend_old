<template>
    <main>
        <div class="main__text">
            <h1>Вход</h1>
        </div>
        <div class="sign__in">
            <input class="login" type="text" ref="login" placeholder="Логин">
            <input class="password" type="password" ref="password" placeholder="Пароль">
            <div class="submit" type="submit" @click="signIn()">Войти</div>
        </div>
        <router-link to="/SignUp" class="sign__up">
            <span class="link__in__signup">Нету аккаунта? Зарегистрируйтесь</span>
        </router-link>
    </main>
</template>

<script>
import axios from '../axios/index.js';

export default {
    name: "SignIn",
    components: {

    },
    methods: {
        async signIn() {
            try {
                let dto = {
                    Name: this.$refs.login.value,
                    Password: this.$refs.password.value
                };

                this.$store.state.loader = true;

                let data = await axios({
                    method: 'post',
                    url: "/users/signIn",
                    data: dto,
                    withCredentials: true
                }).then((response) => response).catch((error) => {
                    alert("Не удалось авторизоваться. " + error.response.data);
                    this.$store.state.loader = false;
                });
                
                if (data.status == 200)
                    this.$store.state.authorized = true;
                else if (data.status == 404)
                    alert("Такого профиля не существует")

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

main {
    display: flex;
    flex-direction: column;
    align-items: center;


    .main__text {
        color: #FF570C;
    }

    .sign__up {
        color: #FF570C;
        text-decoration: none;
    }

    .sign__in {
        padding: 50px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        background-color: #EFEFEF;
        border-radius: 50px;
        align-items: center;
        width: 35%;
        text-align: center;
        line-height: 36px;

        .login, .password{
            border-radius: 15px;
            border-width: 0px;
            height: 72px;
            width: 80%;
            background-color: #B9BABC;
            text-align: center;
            color: rgb(0, 0, 0);
            font-weight: bold;
            font-size: medium;
        }

        .submit {
            cursor: pointer;
            border-radius: 15px;
            border-width: 0px;
            height: 36px;
            width: 40%;
            background-color: #72C850;
            font-weight: bold;
            font-size: medium;
        }

        .submit:hover {
            background-color: #ECA587;
        }
    }
}



</style>