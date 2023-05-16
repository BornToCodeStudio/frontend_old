<template>
    <div class="task">
        <div class="code__area">
            <div class="options">
                <div @click="changeOption(1)" :class="optionType == 1 ? 'selected' : 'option'">HTML</div>
                <div @click="changeOption(2)" :class="optionType == 2 ? 'selected' : 'option'">CSS</div>
                <div @click="changeOption(3)" :class="optionType == 3 ? 'selected' : 'option'">JS</div>
            </div>
            <div class="html-editor" v-show="optionType == 1" ref="html"></div>
            <div class="css-editor" v-show="optionType == 2" ref="css"></div>
            <div class="js-editor" v-show="optionType == 3" ref="js"></div>
            <div class="buttons">
                <div class="upload__file">Загрузить файл</div>
                <div class="preview" @click="preview()">Предпросмотр</div>
                <div class="preview" @click="runJs()" v-show="optionType == 3">Запустить JS</div>
                <div class="send__code" @click="check()">Отправить на проверку</div>
            </div>
            <iframe class="code__preview" :srcdoc="srcDoc"/>
        </div>

        <div class="info">
            <span class="result" :class="{ true: result, false: !result }">Результат</span>
            <span class="description">{{ task().fullDescription }}</span>
            <div class="comments">

            </div>
        </div>
    </div>
</template>

<script>
    import { EditorView, basicSetup } from "codemirror";
    import { html } from "@codemirror/lang-html";
    import { css } from "@codemirror/lang-css";
    import { javascript } from "@codemirror/lang-javascript";

    export default {
        name: "TaskPage",
        components: {
        
        },
        data() {
            return {
                optionType: 1,
                htmlEditor: null,
                cssEditor: null,
                jsEditor: null,
                srcDoc: '',
                result: false
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
            runJs() {
            },
            getPreview() {
                if (!this.htmlEditor || !this.cssEditor)
                    return;

                return this.getText(1) + `<style>${this.getText(2)}</style>`;
            },
            preview() {
                this.srcDoc = this.getPreview();
            },
            getText(type) {
                let editor = null;
                switch (type) {
                    case 1:
                        editor = this.htmlEditor;
                        break;
                    case 2:
                        editor = this.cssEditor;
                        break;
                    case 3:
                        editor = this.jsEditor;
                        break;
                }

                if (!editor)
                    return "";

                return editor.state.doc.toString();
            },
            check() {
                let rules = this.task()?.htmlStruct.checkElementRules;
                if (!rules)
                    return;

                let complete = [];
                rules.forEach(rule => {
                    complete.push(this.checkTextInHtmlElement(rule.value, rule.element, rules.length));
                });

                this.result = complete.every(b => b);
            },
            checkTextInHtmlElement(text, element, rulesLength) {
                const htmlString = this.getText(1);
                const parser = new DOMParser();
                const document = parser.parseFromString(htmlString, 'text/html');
                let body = [...document.querySelector("body").children];

                let array = [...document.querySelector("body").querySelectorAll(element)];
                if (body.length != rulesLength)
                    return false;

                let htmlElement = array.find(e => e.innerHTML == text);
                let innerHTML = htmlElement?.innerHTML;
                if (!innerHTML)
                    return false;

                return text == innerHTML;
            }
        },
        mounted() {
            if (!this.$store.state.authorized) {
                this.$router.push("/SignIn")

                return;
            }

            if (!this.task())
                return;

            let theme = EditorView.theme({
                ".cm-scroller": {"height":"450px"},
                ".cm-activeLine": {"background":"#ffcbb3"},
                ".cm-activeLineGutter": {"background-color":"#ffcbb3"},
                ".ͼi": {"color":"#FF570C"}
            });

            this.htmlEditor = new EditorView({
                extensions: [basicSetup, html(), theme],
                parent: this.$refs.html
            });

            this.cssEditor = new EditorView({
                extensions: [basicSetup, css(), theme],
                parent: this.$refs.css
            });

            this.jsEditor = new EditorView({
                extensions: [basicSetup, javascript(), theme],
                parent: this.$refs.js
            });
        }
    }
</script>

<style lang="scss" scoped>
    @mixin option {
        width: 75px;
        color: white;
        cursor: pointer;
        border-radius: 15px;
    }

    .true {
        background-color: green;
    }

    .false {
        background-color: red;
    }

    .selected {
        @include option;

        background-color: #ff7f44;
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
            gap: 15px;

            .options {
                display: flex;
                flex-direction: row;
                gap: 20px;
                text-align: center;

                .option {
                    @include option;

                    background-color: #FF570C;

                    &:hover {
                        background-color: #ff7f44;
                    }
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
                    color: white;
                    padding: 0.5em;
                    cursor: pointer;
                }

                .preview {
                    cursor: pointer;
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #FF570C;

                    color: white;
                    padding: 0.5em;
                }

                .send__code {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #FF570C;
                    color: white;
                    padding: 0.5em;
                    cursor: pointer;
                }

                .preview:hover, .upload__file:hover, .send__code:hover {
                    background-color: #d45013;
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
                text-align: center;
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