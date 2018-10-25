<template>
    <div>
        <p v-for="ordine in ordini" :key="ordine.key">
            {{ordine.key}}
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        tipoDocumento() {
            return this.$store.getters.getTipoDocumento
        },
        confermaOrdine() {
            return this.$store.getters.getConfermaOrdine
        },
        ordini() {
            return this.$store.getters.getOrdini            
        }
    }
}
</script>
