<template>
    <div>
        <v-alert type="error" :value="true">ERROR {{ code }} : {{ status }}</v-alert>
        <v-container fluid grid-list-md>
            <v-card color="red lighten-5">
                <v-card-title><span class="grey--text">Messaggio di Errore</span></v-card-title>
                <v-card-text>{{ developerMessage }}</v-card-text>
            </v-card>
        </v-container>
        <v-expansion-panel>
            <v-expansion-panel-content>
            <div slot="header">Dettagli aggiuntivi</div>
            <v-card>
                <v-card-text>{{ message }}</v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String
        },
        developerMessage: {
            type: String,
            default: "Risorsa non trovata"
        },
        code: {
            type: Number,
            default: 404
        },
        status: {
            type: String,
            default: "Not Found"
        }
    }
}
</script>

