<template>
<body>
  <nav class="nav__bar">
    <div class="nav__bar-left">
        <router-link to="/" class="home__button">
          <span>{{ logo }}</span>
        </router-link>
    </div>

    <div class="nav__bar-right">
      <div class="auth__block" v-if="!this.$store.state.authorized">
        <router-link to="/SignUp" class="nav-bar-button">
          Регистрация
        </router-link>

        <router-link to="/SignIn" class="nav-bar-button">
          Войти
        </router-link>
      </div>

      <div class="profile-button" v-show="this.$store.state.authorized" @click="goToSelfProfile()">
        <img src="../assets/profile-icon.png"/>
      </div>

      <div id="notifications__button" v-show="this.$store.state.authorized"></div>
    </div>
  </nav>

  <hr>
</body>
</template>

<script>
import axios from '../axios/index.js';

export default {
  name: "nav-bar",
  mounted() {
    this.verifySignIn();
  },
  data() {
    return {
      logo: "Born To C</>de"
    }
  },
  methods: {
    async verifySignIn() {
      try {
        this.$store.state.loader = true;

        await axios({
          method: "post",
          url: "/users/verifySignIn",
          withCredentials: true
        }).then((response) => {
          if (response.status == 200)
            this.$store.state.authorized = true;
          else
            this.$store.state.authorized = false;
        });

        this.$store.state.loader = false;
      }
      catch (error) {
        this.$store.state.authorized = false;
        this.$store.state.loader = false;

        console.log(error);
      }
    },
    async goToSelfProfile() {
      let data = await axios({
        method: "get",
        url: "/users/selfProfile",
        withCredentials: true
      }).then((response) => {
        if (response.status == 200)
          return response.data;
      });

      if (!data)
        return;

      this.$router.push("/Profile/" + data);
    }
  }
};
</script>

<style lang="scss" scoped>
    * {
      font-family: 'Nunito', sans-serif;
    }

    .nav__bar {
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content:space-between;
        padding-left: 15px;
        padding-right: 15px;
        height: 54px;

        .nav__bar-right {
            display: flex;
            gap: 10px;
            flex-direction: row;
        }

        .nav__bar-left {
          span {
            color:#FF570C;
            font-size: 18pt;
            font-weight: bold;
            line-height: 54px;
            white-space: nowrap;
          }
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
      
    }

    .home__button {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      border-radius: 30px;
      border-width: 0px;
      width: 200px;
      height: 50px;

      img {
        width: 70px;
      }
    }

    .nav-bar-button {
      width: 125px;
      cursor: pointer;
      border-radius: 15px;
      border-width: 0px;
      background-color: #ff7332;
      text-decoration: none;
      color: inherit;
      align-items: center;
      text-align: center;
    }

    .profile-button {
      display: flex;
      width: 50px;
      align-items: center;
      border-radius: 15px;
      border-width: 0px;
      background-color: #ff7332;
      cursor: pointer;

      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 47px;
        height: 47px;
        opacity: 40%;
      }
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
        width: 30px;
        background-color: #ff7332;
    }
</style>