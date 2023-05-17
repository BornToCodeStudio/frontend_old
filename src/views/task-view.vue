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
                <div class="send__code" @click="check()">Отправить на проверку</div>
            </div>
            <iframe class="code__preview" :srcdoc="srcDoc" ref="iframe"/>
        </div>

        <div class="info">
            <span class="result" :class="{ true: result, false: !result }">Результат</span>
            <span class="description">{{ task?.fullDescription }}</span>
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
    import { EditorState } from "@codemirror/state";

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
                result: false,
                task: null
            }
        },
        methods: {
            loadTaskFromStore() {
                let id = Number(this.$route.params.id);
                let task = this.$store.getters.getTask(id);
                if (!task) {
                    this.loadTask();

                    return;
                }
                    
                this.task = task;
            },
            async loadTask() {
                try {
                    let data = await this.axios({
                        method: "get",
                        url: "/tasks/get/" + this.$route.params.id,
                        withCredentials: true
                    }).then((response) => {
                        if (response.status == 200)
                            return response.data;
                        else {
                            this.$router.push("/");

                            return null;
                        }
                    });

                    if (!data)
                        return null;

                    this.task = data;
                }
                catch (error) {
                    this.$router.push("/");

                    this.task = null;
                }
            },
            changeOption(type) {
                if (type <= 0 || type > 3)
                    return;

                if (this.optionType == type)
                    return;

                this.optionType = type;
            },
            getPreview() {
                if (!this.htmlEditor || !this.cssEditor || !this.jsEditor)
                    return;

                this.$refs.iframe.contentWindow.eval(this.getText(3));

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
            async solution() {
                this.$store.state.loader = true;

                let verify = false;
                try {
                    verify = await this.axios({
                        method: "post",
                        url: "/users/verifySignIn",
                        withCredentials: true
                        }).then((response) => {
                            return response.status == 200;
                    });
                }
                catch (error) {
                    this.$store.state.loader = false;
                }

                if (!verify) {
                    this.$router.push("/SignIn");

                    this.$store.state.loader = false;

                    return;
                }

                let added = await this.axios({
                    method: 'get',
                    url: '/solutions/isAdded/' + this.$route.params.id,
                    withCredentials: true 
                }).then((response) => {
                    return response.data;
                });
                
                let dto = {
                    TaskId: this.task.id,
                    CreatedAt: new Date().toUTCString(),
                    Html: this.getText(1),
                    Css: this.getText(2),
                    Js: this.getText(3),
                    Completed: this.result,
                    Title: ""
                }

                if (added) {
                    await this.axios({
                        method: 'put',
                        url: '/solutions/update',
                        data: dto,
                        withCredentials: true
                    });
                }
                else {
                    await this.axios({
                        method: "put",
                        url: "/solutions/add",
                        data: dto,
                        withCredentials: true
                    });
                }

                this.$store.state.loader = false;
            },
            async loadSolution() {
                this.$store.state.loader = true;

                let verify = false;
                try {
                    verify = await this.axios({
                        method: "post",
                        url: "/users/verifySignIn",
                        withCredentials: true
                        }).then((response) => {
                            return response.status == 200;
                    });
                }
                catch (error) {
                    this.$store.state.loader = false;
                }

                if (!verify) {
                    this.createEditors("", "", "");

                    this.$store.state.loader = false;

                    return;
                }

                let added = await this.axios({
                    method: 'get',
                    url: '/solutions/isAdded/' + this.$route.params.id,
                    withCredentials: true 
                }).then((response) => {
                    return response.data;
                });

                if (!added) {
                    let dto = {
                        TaskId: this.task.id,
                        CreatedAt: new Date().toUTCString(),
                        Html: "",
                        Css: "",
                        Js: "",
                        Completed: false,
                        Title: this.task.title
                    }

                    await this.axios({
                        method: "put",
                        url: "/solutions/add",
                        data: dto,
                        withCredentials: true
                    });
                }

                let id = await this.axios({
                    method: "get",
                    url: "/users/selfProfile",
                    withCredentials: true
                }).then((response) => {
                    if (response.status == 200)
                    return response.data;
                });

                if (!id) {
                    this.createEditors("", "", "");

                    this.$store.state.loader = false;

                    return;
                }

                let data = await this.axios({
                    method: 'get',
                    url: "/users/getProfile/" + id,
                    withCredentials: true
                }).then((response) => {
                    if (response.status == 200)
                        return response.data;
                });

                let name = data.name;

                let solution = await this.axios({
                    method: 'get',
                    url: `solutions/${name}/get/${this.$route.params.id}`
                }).then((response) => {
                    if (response.status == 200)
                        return response.data;
                    else
                        return {};
                });

                if (!solution) {
                    this.createEditors("", "", "");

                    this.$store.state.loader = false;

                    return;
                }

                this.result = solution.completed;

                this.createEditors(solution?.html, solution?.css, solution?.js);

                this.$store.state.loader = false;
            },
            createEditors(htmlText, cssText, jsText) {
                let theme = EditorView.theme({
                    ".cm-scroller": {"height":"450px"},
                    ".cm-activeLine": {"background":"#ffcbb3"},
                    ".cm-activeLineGutter": {"background-color":"#ffcbb3"},
                    ".ͼi": {"color":"#FF570C"}
                });

                this.htmlEditor = new EditorView({
                    parent: this.$refs.html,
                    state: EditorState.create({
                        doc: htmlText,
                        extensions: [basicSetup, html(), theme]
                    })
                });

                this.cssEditor = new EditorView({
                    parent: this.$refs.css,
                    state: EditorState.create({
                        doc: cssText,
                        extensions: [basicSetup, css(), theme]
                    })
                });

                this.jsEditor = new EditorView({
                    parent: this.$refs.js,
                    state: EditorState.create({
                        doc: jsText,
                        extensions: [basicSetup, javascript(), theme]
                    })
                });
            },
            check() {
                let rules = this.task?.htmlStruct.checkElementRules;
                if (!rules)
                    return;

                let complete = [];
                rules.forEach(rule => {
                    complete.push(this.checkTextInHtmlElement(rule.value, rule.element, rules.length));
                });

                this.result = complete.every(b => b);

                this.solution();
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
            this.loadTaskFromStore();

            this.loadSolution();
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