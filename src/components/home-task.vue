<template>
    <router-link :to="`Task/${task.id}`" class="task">
        <div class="home__tasks">
            <div class="left__part">
                <img ref='taskImg' alt="unload" class="image__preview">
                <span class="author">{{ task.author }}</span>
                <span class="is__tried">{{ true }}</span>
            </div>
            <div class="right__part">
                <span class="task__name">{{ task.title }}</span>
                <span class="task__description">{{ task.shortDescription }}</span>
            </div>
        </div>
    </router-link>
</template>

<script>

export default {
    name: "Home-Task",
    props: { 
        task: {
            type: Object,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
    .task{
        text-decoration: none;
        cursor:pointer;
        color: inherit;

        .home__tasks {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            background-color: #EFEFEF;
            border-radius: 15px;
            width: 600px;
            gap: 10px;

            .left__part {
                margin: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                gap: 10px;

                .image__preview {
                    width: 186px;
                    height: 186px;
                    border-radius: 15px;
                    pointer-events: none;
                }

                .author {
                    color: white;
                    text-align: center;
                    background-color: #8D939F;
                    border-radius: 50px;
                    padding: 0.5em;
                    font-weight: normal;
                    font-size: large;
                }

                .is__tried {
                    text-align: center;
                    background-color: #FF570C;
                    border-radius: 20px;
                    padding: 0.2em;
                    font-weight: bold;
                    font-size: large;
                }
            }

            .right__part {
                margin: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 70%;

                .task__name {
                    padding: 10px;
                    gap: 10px;
                    background-color: #D9D9D9;
                    border-radius: 15px;
                    height: 15%;
                    font-weight: bold;
                    font-size: large;
                }

                .task__description {
                    padding: 10px;
                    background-color: #D9D9D9;
                    border-radius: 15px;
                    height: 100%;
                    font-weight: normal;
                    font-size: large;
                }
            }
        }
    }
</style>
