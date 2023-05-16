<template>
    <div class="task">
        <div class="code__area">
            <div class="options">
                <div @click="changeOption(1)" :class="optionType == 1 ? 'selected' : 'option'">HTML</div>
                <div @click="changeOption(2)" :class="optionType == 2 ? 'selected' : 'option'">CSS</div>
                <div @click="changeOption(3)" :class="optionType == 3 ? 'selected' : 'option'">JS</div>
            </div>
            <textarea class="text__code" ref="editorHtml" v-show="optionType == 1" v-model="html"></textarea>
            <textarea class="text__code" ref="editorCss" v-show="optionType == 2" v-model="css"></textarea>
            <textarea class="text__code" ref="editorJs" v-show="optionType == 3" v-model="js"></textarea>
            <div class="buttons">
                <div class="upload__file">Загрузить файл</div>
                <div class="preview" @click="previewHtml()" v-show="optionType == 1">Предпросмотр</div>
                <div class="preview" @click="runJs()" v-show="optionType == 3">Запустить JS</div>
                <div class="send__code">Отправить на проверку</div>
            </div>
            <iframe class="code__preview" ref="iframe" :srcdoc="this.html + `<style>${this.css}</style>`"/>
        </div>

        <div class="info">
            <span class="result">Результат</span>
            <span class="description">{{ task().fullDescription }}</span>
            <div class="comments">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TaskPage",
        components: {
        
        },
        data() {
            return {
                optionType: 1,
                html: '',
                css: '',
                js: ''
            }
        },
        methods: {
            task() {
                let id = Number(this.$route.params.id);
                let task = this.$store.getters.getTask(id);
                if (!task)
                    return;
                    
                return task;
            },
            changeOption(type) {
                if (type <= 0 || type > 3)
                    return;

                if (this.optionType == type)
                    return;

                this.optionType = type;
            },
            /*runJs() {
                let code = this.codeMirror.getValue();
                let func = new Function(code);

                try {
                    func();
                } catch (error) {
                    alert(error);
                }
            }*/
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @mixin option {
        width: 75px;
        color: white;
        cursor: pointer;
        border-radius: 10px 0 0 0;
}

    .selected {
        @include option;

        background-color: #4e4e4e;
    }

    .task {
        display: grid;
        grid-template-columns: 70% 20%;
        gap: 50px;
        padding-left: 20px;
        padding-top: 20px;

        .code__area {
            display: flex;
            flex-direction: column;

            .text__code {
                background: #1f1f1f;
                color: #fff;
                padding: 10px 20px;
                border: 0;
                outline: 0;
                font-size: 18px;
                flex-basis: 380px;
            }

            .options {
                display: flex;
                flex-direction: row;
                gap: 20px;
                text-align: center;

                .option {
                    @include option;

                    background-color: #282a36;

                    &:hover {
                        background-color: #4e4e4e;
                    }
                }
            }

            .buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-top: 20px;
                padding-bottom: 20px;

                .upload__file {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #FF570C;
                    opacity: 80%;
                    color: white;
                    padding: 0.5em;
                    cursor: pointer;
                }

                .preview {
                    cursor: pointer;
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #FF570C;
                    opacity: 80%;
                    color: white;
                    padding: 0.5em;
                }

                .send__code {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #B5E1AE;
                    color: white;
                    padding: 0.5em;
                    cursor: pointer;
                }

                .preview:hover, .upload__file:hover {
                    background-color: #d45013;
                }

                .send__code:hover {
                    background-color: #ECA587;
                }
            }
        }

        .code__preview {
            width: 100%;
            height: 300px;
            border-radius: 15px;
        }

        .info {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .result {
                display: flex;
                flex-direction: column;
                border-radius: 15px;
                background-color: #B5E1AE;
                text-align: center;
                color: white;
            }

            .result:hover{
                    background-color: #ECA587;
                }

            .description {
                border-radius: 15px;
                background-color: #EFEFEF;
                padding: 15px;
                height: 275px;
                font-size: x-large;
            }
        }
    }
</style>