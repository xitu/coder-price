<style lang="stylus">
</style>


<template lang="jade">
header(v-with="title")
questions
footer(v-with="price")
</template>


<script lang="coffee">
module.exports =
    data:
        title: 'TITLE'
        totalPrice: 0
        questions: require './questions.json'
    components:
        header    : require './components/header.vue'
        questions : require './components/questions.vue'
        footer    : require './components/footer.vue'
    methods:
        setTitle: (title) ->
            @title = title
        addPrice: (price) ->
            @totalPrice += price
        subscribePrice: (price) ->
            @totalPrice -= price
</script>