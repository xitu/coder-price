<style lang="stylus">
body, html
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
header, footer
    position: fixed;
    z-index: 10;
    background: red;
    color: #fff;
    left: 0;
    right: 0;
    text-align: center;
header
    top: 0;
footer
    bottom: 0;
.questions
    position: absolute;
    top: 60px;
    bottom: 60px;
    height: 100%;
.questions .question
    height: 100%;
</style>

<template lang="jade">
header
    p 招一个好程序猿要多少钱？
section.questions
    article.question(v-repeat="questions" v-component="question")
footer
    p ￥{{totalPrice()}}
</template>


<script lang="coffee">
module.exports =
    data:
        title: 'asdsadas'
        questions: require './questions.json'
    components:
        question : require './components/question.vue'
    methods:
        totalPrice: () ->
            price = 0
            for question in @questions
                selected = question.selected
                options  = question.options
                if selected isnt null
                    price += options[selected].price
            price
</script>