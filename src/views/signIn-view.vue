<template>
    <main>
        <div class="main__text">
            <h1>Вход</h1>
        </div>
        <div class="sign__in">
            <input class="login" type="text" ref="login" placeholder="Логин">
            <input class="password" type="password" ref="password" placeholder="Пароль">
            <button class="submit" type="submit" @click="signIn()">Войти</button>
        </div>
        <router-link to="/SignUp" class="sign__up">
            <span >Нету аккаунта? Зарегистрируйтесь</span>
        </router-link>
    </main>
</template>

<script>
import axios from 'axios';

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

                let data = await axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "/users/signIn",
                    data: dto,
                    withCredentials: true
                }).then((response) => response).catch((error) => {
                    alert("Не удалось авторизоваться. " + error.response.data);
                });
                
                if (data.status == 200)
                    this.$store.state.authorized = true;
                else if (data.status == 404)
                    alert("Такого профиля не существует")
            } catch (error) {
                console.log(error);
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
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        color: #AFCFF9;
    }

    .sign__up {
        color: #AFCFF9;
        text-decoration: none;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
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
        
        

        .login, .password{
            border-radius: 15px;
            border-width: 0px;
            height: 72px;
            width: 80%;
            background-color: #B9BABC;
            text-align: center;
            color: #FF570C;
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