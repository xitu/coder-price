<style lang="stylus">
.title
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
.options
    padding-left: 0;
    list-style: none;
.option
    padding: 10px;
.option.selected
    background-color: red;
    color: #fff;
</style>

<template lang="jade">
.title {{index + 1}}：{{title}}
ul.options
    li.option.pointer(
        v-class="selected : $index === selected"
        v-repeat="options"
        v-on="click : select($index)"
    ) {{desc}}
</template>

<script lang="coffee">
module.exports =
    methods:
        select: (index) ->
            @selected = index

</script>