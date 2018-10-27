<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar card>
            <v-toolbar-title>Ordini da vistare</v-toolbar-title>
            <div slot="extension">
                Tipo Documento : {{ tipoDocumento.codice }} {{ tipoDocumento.descrizione }}
                <br>
                Conferma d'Ordine : {{ confermaOrdine.codice }} {{ confermaOrdine.descrizione }}
            </div>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>check_circle</v-icon>
            </v-btn>
            <v-divider light vertical></v-divider>
            <v-btn icon @click="print()">
                <v-icon>print</v-icon>
            </v-btn>
            <v-divider light vertical></v-divider>
            <v-btn icon @click="toggleAll()">
                <v-icon v-if="allToggled">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(ordine, index) in ordini">
            <v-list-tile :key="ordine.key" avatar ripple @click="toggle(index, ordine)">
              <v-list-tile-content>
                <v-list-tile-title><strong>{{ ordine.numeroDocumento }} </strong> - {{ ordine.commessa }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ ordine.ragioneSociale }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ ordine.utente }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ new Date(ordine.dataDocumento).toISOString().substring(0, 10) }}</v-list-tile-action-text>
                <v-icon v-if="indiciSelezionati.indexOf(index) < 0"> check_box_outline_blank </v-icon>
                <v-icon v-else> check_box </v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < ordini.length" :key="index" ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            indiciSelezionati: [],
            ordiniSelezionati: []
        }
    },
    computed: {
        tipoDocumento() {
            return this.$store.getters.getTipoDocumento
        },
        confermaOrdine() {
            return this.$store.getters.getConfermaOrdine
        },
        ordini() {
            return this.$store.getters.getOrdini            
        },
        allToggled() {
            return this.indiciSelezionati.length >= this.ordini.length
        }
    },
     methods: {
        toggle (index, ordine) {
            const i = this.indiciSelezionati.indexOf(index)
            if (i > -1) {
                this.indiciSelezionati.splice(i, 1)
                this.ordiniSelezionati.splice(i, 1)
            } else {
                this.indiciSelezionati.push(index)
                this.ordiniSelezionati.push(ordine)
            }
        },
        toggleAll() {
            if (this.allToggled) {
                // untoggle
                this.indiciSelezionati = []
                this.ordiniSelezionati = []
            } else {
                // toggle all
                for (let i = 0; i < this.ordini.length; i++) {
                    this.indiciSelezionati.push(i)
                    this.ordiniSelezionati.push(this.ordini[i])
                }
            }
        },
        print() {
            if (this.ordini.length == 0)
                return
            const ordineDaStampare = this.ordiniSelezionati[0]
            axios({
                method: 'post',
                url: '/ordine/print',
                data: ordineDaStampare, 
                responseType:'stream',
                headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                // eslint-disable-next-line
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'ordine_' + ordineDaStampare.key + '.pdf');
                document.body.appendChild(link);
                link.click();
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                this.$store.dispatch('handleError', error.response.data)
            })
        }
    }
}
</script>