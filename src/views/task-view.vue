<template>
    <main>
        <div class="code__area">
            <div class="code__live">
                <textarea class="code__editor" v-model="content" id="editor"></textarea>
            </div>
            <div class="buttons">
                <button class="upload__file">Upload file</button>
                <button class="preview">Preview</button>
                <button class="send__code">Send code</button>
            </div>
            <div class="code__preview">
            </div>
        </div>

        <div class="info">
            <span class="result">result</span>
            <span class="description">description</span>
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
        components: {
        
        },
        data() {
            return {
                content: "let a = 0;",

}
                },
        mounted() {
            CodeMirror.fromTextArea(document.getElementById('editor'),{
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
        display: grid;
        grid-template-columns: 70% 20%;
        gap: 50px;

        .code__area {
            display: flex;
            flex-direction: column;
            gap: 15px;

            .buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .upload__file {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #99B0ED;
                    color: white;
                }

                .preview {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #99B0ED;
                    color: white;
                }

                .send__code {
                    border-radius: 15px;
                    border-width: 0px;
                    background-color: #B5E1AE;
                    color: white;
                }
            }
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
            }

            .description {
                border-radius: 15px;
                background-color: #EFEFEF;
                text-align: center;
                height: 75%;
            }
        }
    }
</style>