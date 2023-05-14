<template>
  <nav class="nav__bar">
    <div class="nav__bar-left">
        <router-link to="/">
            <button id="home__button">Главная</button>
        </router-link>
    </div>

    <div class="nav__bar-right">
      <div class="auth__block">
        <router-link to="/SignUp">
          <button id="sign-up__button">Регистрация</button>
        </router-link>

        <router-link to="/SignIn">
          <button id="sign-in__button">Войти</button>
        </router-link>
      </div>

      <router-link to="/Profile">
        <button id="profile__button">Профиль</button>
      </router-link>

      <button id="notifications__button"></button>
    </div>
  </nav>

  <hr>
</template>

<script>
export default {
  name: "nav-bar"
};
</script>

<style lang="scss" scoped>
    .nav__bar {
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content:space-between;
        padding-left: 15px;
        padding-right: 15px;

        .nav__bar-right {
            display: flex;
            gap: 10px;
            flex-direction: row;
        }
    }

    .auth__block {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    body {
        margin: 0;
        padding: 0;
    }

    hr {
        background-color: #A0C6F8;
        height: 1px;
    }

    #home__button {
      font-family:Verdana, Geneva, Tahoma, sans-serif;
      cursor: pointer;
      border-radius: 30px;
      border-width: 0px;
      width: 200px;
      height: 50px;
    }

    #sign-up__button {
      display: flex;
      flex-direction: row;
      text-align: center;
      font-family:Verdana, Geneva, Tahoma, sans-serif;
      cursor: pointer;
      border-radius: 15px;
      border-width: 0px;
      background-color: #FF570C;
      opacity: 80%;
      text-align: center;
    }

    #sign-in__button {
      display: flex;
      flex-direction: row;
      text-align: center;
      font-family:Verdana, Geneva, Tahoma, sans-serif;
      cursor: pointer;
      border-radius: 15px;
      border-width: 0px;
      width: 95px;
      background-color: #FF570C;
      opacity: 80%;
      padding-left: 28px;

    }

    #profile__button {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-radius: 15px;
      border-width: 0px;
      height: 50px;
      padding-top: 14px;
      text-align: center;
    }

    #notifications__button {
        cursor: pointer;
        border-radius: 10px;
        border-width: 0px;
        height: 50px;
        width: 30px;
        background-color: #FF570C;
        opacity: 80%;
    }

    #home__button:hover, #profile__button:hover,#sign-up__button:hover, #sign-in__button:hover, #notifications__button:hover{
      background-color: #d45013;
    }
</style>