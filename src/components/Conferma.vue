<template>
    <v-container fluid>
        <v-layout row wrap align-center>
            <v-flex>
                <v-select
                    :items="confermeOrdine"
                    v-model="confermaOrdineScelta"
                    label="Conferma d'Ordine"
                    hint="Scegli la Conferma d'Ordine"
                    persistent-hint
                    @change="changeConfermaOrdine"
                >
                   <template slot="selection" slot-scope="{item}">
                        {{ item.codice }} &nbsp; {{ item.descrizione }}
                    </template>
                    <template slot="item" slot-scope="{item}">
                        {{ item.codice }} &nbsp; {{ item.descrizione }}
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        confermaOrdineScelta: null
    }),
    created() {
        this.confermaOrdineScelta = this.$store.getters.getConfermaOrdine
    },
    computed: {
        confermeOrdine() {
            return this.$store.getters.getConfermeOrdine
        }
    },
    methods: {
        changeConfermaOrdine() {
            this.$store.dispatch('setConfermaOrdine', this.confermaOrdineScelta)
            this.$router.push('/vistatura')
        }
    }
}
</script>
