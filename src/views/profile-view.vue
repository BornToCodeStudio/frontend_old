<template>
<body>
    <main>    
        <div class="profile__column">
            <div class="profile__info">
                <img :src="avatarUrl" ref='profileImg' alt="unload" class="profile__image">

                <span id="profile__nickname">{{ nickname }}</span>
                <span id="profile__aboutme">О себе:</span>

                <textarea id="profile__aboutme-text" style="resize: none;" v-model="aboutme"></textarea>

                <div id="subscribe__button">Подписаться</div>

                <input type="file" ref="file" @change="selectFile()">
                <div class="send__photo" @click="sendFile()">Отправить фото</div>
            </div>
            <div id="profile__stats">
                <StatsItem text="Лайков" :value="likes"/>
                <StatsItem text="Подписчиков" :value="subscribers"/>
                <StatsItem text="Подписок" :value="subscriptions"/>
                <StatsItem text="Просмотов" :value="views"/>
            </div>
        </div>
        <div class="tasks">
            <div class="tasks__buttons">
                <div id="completed-tasks__button">Завершенные задания</div>
                <div id="created-tasks__button">Созданные задания ({{ tasksCount }} шт.)</div>
            </div>
            <div class="tasks__items">
                <div id="task-item">
                    <SomeTask v-bind:key="index" v-for="(task, index) in tasks" :taskname="task.title" :taskId="task.taskId"/>
                </div>
            </div>
        </div>
    </main>
</body>
    
</template>
    
<script>
import SomeTask from '../components/some-task.vue';
import StatsItem from '../components/stats-item.vue';
import profileImage from '../assets/default_avatar.png';

export default{
    name: "profile-page",
    components: {
        SomeTask,
        StatsItem
    },
    data() {
        return {
            tasksCount: 0,
            tasks: [],
            nickname: "",
            aboutme: "",
            file: "",
            likes: "0",
            subscribers: "0",
            subscriptions: "0",
            views: "0",
            avatarUrl: '../assets/default_avatar.png'
        }
    },
    methods: {
        async loadProfile() {
            this.$store.state.loader = true;

            let data = await this.axios({
                method: 'get',
                url: "/users/getProfile/" + this.$route.params.userId,
                withCredentials: true
            }).then((response) => {
                if (response.status == 200)
                    return response.data;
            });

            this.nickname = data.name;

            await this.loadSolutions();
            await this.loadAvatar();

            this.$store.state.loader = false;
        },
        async loadSolutions() {
            let data = await this.axios({
                method: 'get',
                url: `solutions/${this.nickname}/getAll`,
                responseType: 'json'
            }).then(function (response) {
                if (response.status == 200) {
                    return response.data;
                }

                return [];
            });

            let completedTasks = [];
            data.forEach(task => {
                if (task.completed)
                    completedTasks.push(task);
            });

            this.tasks = completedTasks;
        },
        selectFile() {
            let file = this.$refs.file.files[0];
            let size = this.formatBytes(file.size);
            if (size > 3) {
                alert("Максимальный размер аватарки не более 3 МБ");
                
                this.$refs.file.value = null;                

                return;
            }

            this.file = file;
        },
        async sendFile() {
            if (this.file == "")
                return;

            let formData = new FormData();
            formData.append('formFile', this.file);

            await this.axios({
                data: formData,
                method: 'put',
                url: '/users/sendPhoto',
                withCredentials: true
            }).then((response) => {
                if (response.status == 200) {
                    this.file = "";
                    this.$refs.file.value = null;

                    alert("Аватарка обновлена");

                    this.loadAvatar();
                }
            });
        },
        async loadAvatar() {
            let data = null;
            try {
                data = await this.axios({
                    method: 'get',
                    url: 'users/getPhoto/' + this.nickname,
                    responseType: 'json'
                }).then((response) => {
                    if (response.status == 200)
                        return response.data;

                    return null;
                });
            }
            catch(error) {
                this.$refs.profileImg.src = profileImage;
            }

            if (data == null) {
                this.$refs.profileImg.src = profileImage;

                return;
            }

            this.avatarUrl = "data:image/jpg;base64," + data.avatar;
        },
        formatBytes(bytes, decimals = 2) {
            if (bytes === 0) {
                return '0';
            } else {
                var k = 1024;
                var dm = decimals < 0 ? 0 : decimals;
                return parseFloat((bytes / Math.pow(k, 2)).toFixed(dm));
            }
        }
    },
    mounted() {
        this.loadProfile();
    }
}

</script>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .profile__column {
        display: flex;
        flex-direction: column;
        gap:15px;
        margin: 10px;
        border: 1px dashed black;
        width: 25%;
        height: 630px;
        background-color: #EFEFEF;
        border-radius: 45px;
        border-color: #FF570C;
        
    }

    .profile__info {
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    #profile__nickname {
        text-align: center;
        background-color: #FF570C;
        border-radius: 15px;
        width: 92px;
        height: 20px;

        @media (max-width: 1400px) {
            width: 92px;
        }
    }

    #profile__aboutme {
        text-align: center;
        background-color: #B9BABC;
        border-radius: 15px;
        width: 92px;
        height: 20px;
    }

    #profile__aboutme-text {
        background-color: #B9BABC;
        border-color: #FF570C;
        border-radius: 10px;  
    }

    #subscribe__button {
        cursor: pointer;
        text-align: center;
        background-color: #FF570C;
        border-radius: 20px;
        border-width: 0px;
        padding: 0.5em;
    }

    #profile__stats {
        display: flex;
        flex-direction: column;
        justify-content:left;
        margin-top: 40px;
        margin-left: 10px;
        width: 100px;
        gap: 10px;
    }

    .tasks {
        display: flex;
        flex-direction: column;
        grid-column: 2;
        padding-right: 30px;
        gap: 20px;
        width: 65%;
    }

    .tasks__buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #completed-tasks__button {
        cursor: pointer;
        border-radius: 30px;
        border-width: 0px;
        background-color: #FF570C;
        width: 45%;
        height: 55px;
        text-align: center;
        line-height: 55px;
        color: white;
        
        @media (max-width: 800px) {
            width: 110px;
        }
    }

    #created-tasks__button {
        cursor: pointer;
        border-radius: 30px;
        border-width: 0px;
        background-color: #FF570C;
        width: 45%;
        height: 55px;
        text-align: center;
        line-height: 55px;
        color: white;

        @media (max-width: 800px) {
            width: 110px;
        }
    }

    .profile__image {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        transition: 1s;
    }

    .profile__image:hover {
        transform: scale(1.25);
    }

    .tasks__items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    #task-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        gap: 30px;
        flex-wrap: wrap;
    }

    .send__photo{
        cursor: pointer;
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        border-width: 0;
        padding: 0.5em;
        background-color: #FF570C;
        border-radius: 15px;
        text-align: center;
    }

    input::file-selector-button {
        cursor: pointer;
        font-weight: bold;
        padding: 0.5em;
        border: thin solid #FF570C;
        border-radius: 15px;
    }

    input::file-selector-button:hover, #subscribe__button:hover, #completed-tasks__button:hover, #created-tasks__button:hover, .send__photo:hover{
        background-color: #d45013;
    }

</style>