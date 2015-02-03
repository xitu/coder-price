<style lang="stylus" src="app.styl"></style>

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