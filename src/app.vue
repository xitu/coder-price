<style lang="stylus">
</style>

<template lang="jade">
header
    p 招一个好程序猿要多少钱？
div.container
    section.questions
        article.question(v-repeat="questions" v-component="question")
footer
    p ￥{{totalPrice}}
</template>


<script lang="coffee">
module.exports =
    data:
        title: 'asdsadas'
        questions: require './questions.json'
    components:
        questions : require './components/question.vue'
    computed:
        totalPrice: () ->
            price = 0
            for question in @questions
                if selected
                    price += question[selected].price
            price

</script>