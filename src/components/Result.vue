<template>
    <v-layout row>
        <v-flex>
            <v-card v-if="this.vistati.length > 0">
                <v-expansion-panel>
                    <v-expansion-panel-content class="success">
                        <div slot="header">
                            <v-alert type="success" :value="true" icon="check_circle">
                                ORDINI VISTATI
                                <br>
                                I seguenti ordini sono stati vistati correttamente
                                <br>
                                <font color='#ccffcc'>Tocca per visualizzare gli ordini</font>
                            </v-alert>
                        </div>
                        <v-list two-line subheader light>
                            <v-list-tile avatar v-for="ordineVistato in vistati" :key="ordineVistato.key">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ tipoDocumento.codice }}/{{ ordineVistato.numeroDocumento }}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        {{ ordineVistato.commessa }} - {{ ordineVistato.ragioneSociale }}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
            <br>
            <v-card dark v-if="this.nonVistati.length > 0" >
                <v-expansion-panel>
                    <v-expansion-panel-content class="error">
                        <div slot="header">
                            <v-alert type="error" :value="true" icon="warning">
                                ORDINI NON VISTATI
                                <br>
                                I seguenti ordini necessitano di autorizzazioni aggiuntive
                                <br>
                                <font color='#ffb3b3'>Tocca per visualizzare gli ordini</font>
                            </v-alert>
                        </div>
                        <v-list two-line subheader light>
                            <v-list-tile avatar v-for="ordineNonVistato in nonVistati" :key="ordineNonVistato.key">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ tipoDocumento.codice }}/{{ ordineNonVistato.numeroDocumento }}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        {{ ordineNonVistato.commessa }} - {{ ordineNonVistato.ragioneSociale }}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-flex>    
    </v-layout>
</template>

<script>
export default {
    props: {
        vistati: {
            type: Array,    
            default: () => []
        },
        nonVistati: {
            type: Array,    
            default: () => []
        }
    }, 
    computed: {
        tipoDocumento() {
            return this.$store.getters.getTipoDocumento
        }
    }
}
</script>

<style>
    .cardError {
        background-color: brown
    }
</style>
