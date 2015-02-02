<template lang="jade">
h2 {{title}}
ul.options
    li.option(
        class="{{$index === selected && 'selected'}}"
        v-repeat="options"
        v-on="on : select($index)"
    ) {{desc}}
</template>

<script lang="coffee">
module.exports =
    methods:
        select: (index) ->
            @selected = index if index >= 0 and index < @options.length
</script>