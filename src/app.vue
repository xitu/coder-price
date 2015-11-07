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
    position: absolute;
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
.pointer
    cursor: pointer;
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
    p 这个程序员需要 ￥{{totalPrice}} 才能招的起！
    p
        span(v-if="inWechat" style="color: red;") 点击右上角分享到微信
        span(v-if="!inWechat")
            a(v-attr="href: weiboShareUrl()", target='_blank') 分享到微博
    p.promo
        下载
        a(href='https://gold.xitu.io/app') 掘金
        | 应用，挖掘更多的技术干货

footer
    p ￥{{showPrice}}
</template>


<script lang="coffee">
module.exports =
    data:
        currentQuestionIndex: 0
        questions: require './questions.json'
        totalPrice: 0
        showPrice: 0
    components:
        question : require './components/question.vue'
    methods:
        currentQuestion: (index) ->
            @currentQuestionIndex < @questions.length and @questions[@currentQuestionIndex]
        nextQuestion: () ->
            countPrice = () =>
                price = 0
                for question in @questions
                    selected = question.selected
                    options  = question.options
                    if selected isnt null
                        price += options[selected].price
                price
            showPrice = (from, to) =>
                count = 100
                time = 500
                interval = (to - from) / count
                i = 0
                counter = setInterval () =>
                    i += 1
                    @showPrice = from + i * interval
                    if i is count
                        clearInterval counter
                , (time / count)
            if @enableNextQuestion()
                @currentQuestionIndex += 1
                toPrice = countPrice()
                showPrice(@totalPrice, toPrice)
                @totalPrice = toPrice
                if @currentQuestionIndex is @questions.length
                    document.title = "作为一个程序猿我的身价是￥#{@totalPrice}，来测测你的身价是多少！"
        enableNextQuestion: () ->
            @questions[@currentQuestionIndex].selected isnt null
        weiboShareUrl: () ->
            appUrl = 'http://xitu.github.io/coder-price/'
            desc = "#{appUrl}：作为一个程序猿我的身价是￥#{@totalPrice}，来测测你的身价是多少！@稀土圈"
            url = 'https://xitu.io'
            "http://service.weibo.com/share/share.php?title=#{encodeURIComponent(desc)}&url=#{encodeURIComponent(url)}"
    computed:
        inWechat: () ->
            window.navigator.userAgent.toLowerCase().indexOf('micromessenger') isnt -1
</script>
