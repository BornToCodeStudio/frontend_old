<template>
    <main>
        <div class="code__area">
            <div class="code__live">
                <textarea class="text__code" ref="editor"></textarea>
            </div>
            <div class="buttons">
                <button class="upload__file">Upload file</button>
                <button class="preview" @click="preview()">Preview</button>
                <button class="send__code">Send code</button>
            </div>
            <iframe class="code__preview" :srcdoc="text"/>
        </div>

        <div class="info">
            <span class="result">result</span>
            <span class="description">{{ task().description }}</span>
            <div class="comments">

            </div>
        </div>
    </main>
</template>

<script>
    import * as CodeMirror from 'codemirror';
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/yeti.css'
    import 'codemirror/mode/javascript/javascript.js'

    export default {
        name: "TaskPage",
        components: {
        
        },
        data() {
            return {
                text: "",
                description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».",
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
                let text = this.codeMirror.display.maxLine.text;
                this.text = text;
            }
        },
        mounted() {
            this.codeMirror = CodeMirror.fromTextArea(this.$refs.editor, {
                lineNumbers: true,
                theme: "yeti",
                mode: 'javascript',
                styleActiveLine: true,
                matchBrackets: true,
            })
        }
        
  }
</script>

<style lang="scss" scoped>
    main {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        display: grid;
        grid-template-columns: 70% 20%;
        gap: 50px;

        .code__area {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .text__code {
                border-radius: 15px;
            }

            .buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .upload__file {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #99B0ED;
                    color: white;
                    padding: 0.5em;
                }

                .preview {
                    cursor: pointer;
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #99B0ED;
                    color: white;
                    padding: 0.5em;
                }

                .send__code {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #B5E1AE;
                    color: white;
                    padding: 0.5em;
                }

                .preview:hover, .upload__file:hover {
                    background-color: #567ff0;
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
                border-radius: 15px;
                background-color: #B5E1AE;
                text-align: center;
                width: 20%;
                color: white;
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