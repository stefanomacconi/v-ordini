<template>
    <v-container fluid>
        <v-layout row wrap align-center>
            <v-flex>
                <v-select
                    :items="tipiDocumento"
                    v-model="tipoDocumentoScelto"
                    label="Tipo Documento"
                    hint="Scegli il Tipo Documento"
                    persistent-hint
                    @change="changeTipoDocumento"
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
        tipoDocumentoScelto: null
    }),
    created() {
        this.tipoDocumentoScelto = this.$store.getters.getTipoDocumento
    },
    computed: {
        tipiDocumento() {
            return this.$store.getters.getTipiDocumento
        }
    },
    methods: {
        changeTipoDocumento() {
            this.$store.dispatch('setTipoDocumento', this.tipoDocumentoScelto)
            this.$router.push('/vistatura')
        }
    }
}
</script>
