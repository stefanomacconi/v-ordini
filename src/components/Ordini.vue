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
        ordini() {
            const tipoDocumento = this.$store.getters.getTipoDocumento
            const confermaOrdine = this.$store.getters.getConfermaOrdine
            if (tipoDocumento !== null && confermaOrdine !== null) {
                this.$store.dispatch('fetchOrdiniDaVistare')
                return this.$store.getters.getOrdini            }
        }
    }
}
</script>
