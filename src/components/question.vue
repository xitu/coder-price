<style lang="stylus">
.options .option.selected
    background-color: yellow;
</style>

<template lang="jade">
p
    strong {{title}}
ul.options
    li.option(
        v-class="selected : $index === selected"
        v-repeat="options"
        v-on="click : select($index)"
    ) {{desc}}
</template>

<script lang="coffee">
module.exports =
    methods:
        select: (index) ->
            @selected = index if index >= 0 and index < @options.length
</script>