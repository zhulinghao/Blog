<template>
    <div>
        <div id="editorElem" style="text-align:left"></div>
        <button v-on:click="getContent">发布</button>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      mounted() {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style scoped>
</style>