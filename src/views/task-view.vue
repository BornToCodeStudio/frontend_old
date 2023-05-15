<template>
    <div class="task">
        <div class="code__area">
            <div class="options">
                <div class="option" @click="changeOption(1)">HTML</div>
                <div class="option" @click="changeOption(2)">CSS</div>
                <div class="option" @click="changeOption(3)">JS</div>
            </div>
            <div class="code__live">
                <textarea class="text__code" ref="editor"></textarea>
            </div>
            <div class="buttons">
                <div class="upload__file">Загрузить файл</div>
                <div class="preview" @click="preview()" v-show="optionType == 1">Предпросмотр</div>
                <div class="preview" @click="runJs()" v-show="optionType == 3">Запустить JS</div>
                <div class="send__code">Отправить на проверку</div>
            </div>
            <iframe class="code__preview" v-show="optionType == 1" :srcdoc="text"/>
        </div>

        <div class="info">
            <span class="result">Результат</span>
            <span class="description">{{ task().description }}</span>
            <div class="comments">

            </div>
        </div>
    </div>
</template>

<script>
    import * as CodeMirror from 'codemirror';
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/dracula.css'
    import 'codemirror/mode/htmlmixed/htmlmixed.js'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/css/css.js';

    export default {
        name: "TaskPage",
        components: {
        
        },
        data() {
            return {
                optionType: 1,
                text: '',
                codeMirror: null
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
            preview() {
                let text = this.codeMirror.getValue();
                this.text = text;
            },
            changeOption(type) {
                if (type <= 0 || type > 3)
                    return;

                if (this.optionType == type)
                    return;

                this.optionType = type;

                this.createEditor(type);
            },
            createEditor(type) {
                let mode = "";

                switch (type) {
                    case 1:
                        mode = "htmlmixed";
                        break;
                    case 2:
                        mode = "css";
                        break;
                    case 3:
                        mode = "javascript";
                        break;
                }

                if (this.codeMirror)
                    this.codeMirror.toTextArea();

                this.codeMirror = CodeMirror.fromTextArea(this.$refs.editor, {
                    lineNumbers: true,
                    theme: "dracula",
                    mode: mode,
                    styleActiveLine: true,
                    matchBrackets: true,
                })
            },
            runJs() {
                let code = this.codeMirror.getValue();
                let func = new Function(code);

                try {
                    func();
                } catch (error) {
                    alert("Долбаеб? " + error);
                }
            }
        },
        mounted() {
            this.createEditor(1);
        }
    }
</script>

<style lang="scss" scoped>
    .task {
        display: grid;
        grid-template-columns: 70% 20%;
        gap: 50px;

        .code__area {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .options {
                display: flex;
                flex-direction: row;
                gap: 20px;

                .option {
                    cursor: pointer;
                }
            }

            .buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

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