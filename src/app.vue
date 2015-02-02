<style lang="stylus">
*, *:before, *:after
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
body, html
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
body
    font-family: "Hiragino Sans GB", Helvetica, Arial, sans-serif;
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
.share, .questions
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 60px;
    left: 0;
.questions .question
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    height: 100%;
.questions .action
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
.questions .action.active
    cursor: pointer;
.questions .action [class*=icono-]
    transition: all 0.3s;
.questions .action.active [class*=icono-]
    color: red;
.share
    padding-top: 30px;
.share .promo
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
button
    -webkit-appearance: none;
    appearance: none;
    padding: 10px;
    border: 2px solid red;
    border-radius: 50%;
    background: none;
    color: red;
button [class*=icono-]
    color: red;
.share button
    margin: 20px;

// UTILS
.text-center
    text-align: center;
</style>

<template lang="jade">
header
    p 招一个好程序猿要多少钱？
section.questions(v-if="currentQuestion()" v-transition="fade")
    article.question(
        v-component="question"
        v-with="currentQuestion(), index: currentQuestionIndex")
    .action.text-center(
        v-class="active: enableNextQuestion()"
        v-on="click: nextQuestion()")
        i.icono-checkCircle
section.share.text-center(v-if="!currentQuestion()")
    button
        i.icono-share
    p 这个程序员需要 ￥{{totalPrice()}} 才能招的起！
    p
        span(v-if="inWechat") 点击右上角分享到微信
        - var desc="招一个好程序猿要 @稀土圈"
        span(v-if="!inWechat")
            a(v-attr="href: weiboShareUrl()", target='_blank') 分享到微博
    p.promo
        small 在
            a(href='https://xitu.io/') 稀土
            | 可以找到比这更棒的程序猿哦！

footer(v-if="currentQuestion()")
    p ￥{{totalPrice()}}
</template>


<script lang="coffee">
module.exports =
    data:
        currentQuestionIndex: 0
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
        currentQuestion: (index) ->
            @currentQuestionIndex < @questions.length and @questions[@currentQuestionIndex]
        nextQuestion: () ->
            if @enableNextQuestion()
                @currentQuestionIndex += 1
        enableNextQuestion: () ->
            @questions[@currentQuestionIndex].selected isnt null
        weiboShareUrl: () ->
            appUrl = 'http://coder-price.xitu.io'
            desc = "#{appUrl}：我招一个好程序猿要￥#{@totalPrice()}，看看你需要多少钱的程序猿？@稀土圈"
            url = 'https://xitu.io'
            "http://service.weibo.com/share/share.php?title=#{encodeURIComponent(desc)}&url=#{encodeURIComponent(url)}"
    computed:
        inWechat: () ->
            window.navigator.userAgent.toLowerCase().indexOf('micromessenger') isnt -1


</script>