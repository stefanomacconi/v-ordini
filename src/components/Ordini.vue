<template>
  <v-layout>
    <v-flex>
        <v-layout row wrap>
                <v-flex xs6 class="grey lighten-3">
                    <v-list-tile color="grey darken-1" avatar v-if="tipoDocumento.codice" @click="goToDocumento()">
                        <v-list-tile-content class="text-xs-center">
                            <v-list-tile-title class="text-xs-center">TIPO DOCUMENTO</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ tipoDocumento.codice }} {{ tipoDocumento.descrizione }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-flex>
                <v-flex xs6 class="grey lighten-3">
                    <v-list-tile color="grey darken-1" avatar v-if="confermaOrdine.codice" @click="goToConferma()">
                        <v-list-tile-content class="text-xs-center">
                            <v-list-tile-title class="text-xs-center">CONFERMA D'ORDINE</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ confermaOrdine.codice }} {{ confermaOrdine.descrizione }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-flex>
        </v-layout>
        <br>
      <v-card v-if="this.ordini.length > 0">
        <v-toolbar card>
            <v-toolbar-title>Ordini da vistare</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="confermaVistaOrdini()">
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
      <v-alert type="success" :value="this.ordini.length == 0" icon="check_circle">
        NESSUN ORDINE DA VISTARE
      </v-alert>
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confermare la vistatura?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false" >
            Annulla
          </v-btn>
          <v-btn color="success" @click="vistaOrdini()">
            Conferma
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-xs-center">
      <v-dialog v-model="dialogLoading" persistent width="300" >
        <v-card color="primary" dark>
          <v-card-text>
            Attendere...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            indiciSelezionati: [],
            ordiniSelezionati: [],
            dialog: false,
            dialogLoading: false
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
            if (this.ordiniSelezionati.length == 0)
                return
            this.dialogLoading = true
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
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'ordine_' + ordineDaStampare.key + '.pdf');
                document.body.appendChild(link);
                link.click();
                this.dialogLoading = false
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                this.$store.dispatch('handleError', error.response.data)
            })
        },
        confermaVistaOrdini() {
            if (this.ordiniSelezionati.length == 0)
                return
            this.dialog = true
        },
        vistaOrdini() {
            this.dialog = false
            this.dialogLoading = true
            axios({
                method: 'post',
                url: '/ordine/fornitore/vista',
                data: this.ordiniSelezionati, 
                headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const ordiniData = {
                        vistati : res.data.vistati,
                        nonVistati : res.data.nonVistati
                    }
                // eslint-disable-next-line
                console.log(ordiniData)
                this.$router.push({ name: 'result', params: {
                    vistati : ordiniData.vistati,
                    nonVistati : ordiniData.nonVistati
            }})
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                this.$store.dispatch('handleError', error.response.data)
            })
            
        },
        goToDocumento() {
            this.$router.push('/documento')
        },
        goToConferma() {
            this.$router.push('/conferma')
        }
    }
}
</script>