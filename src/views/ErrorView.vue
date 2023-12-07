<template>
   <p>{{ translate('TEXT.PAGE_NOT_FOUND') }}</p>
</template>

<script lang='ts' setup>
import {useAppI18n} from '@/i18n'

const {translate} = useAppI18n()
</script>

<style lang='scss' scoped>

</style>
