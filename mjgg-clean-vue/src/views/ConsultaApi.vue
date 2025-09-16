<template>
  <div class="consulta-container">
    <div class="header-title">
      <span>Consulta Previsão de Consumo e Gastos</span>
    </div>

    <div class="form-group">
      <label>Preço Combustível (R$):</label>
      <input name="c1" v-model="preco" placeholder="Digite o preço do combustível" @keyup="validar($event, true)" class="input-field" maxlength="4" x/>
    </div>

    <div class="form-group">
      <label>Km dentro da cidade`:</label>
      <input name="c2" v-model="kmCidade" placeholder="Digite a quantidade de quilômetros a rodar dentro da cidade" @keyup="validar($event, false)" class="input-field" maxlength="4"/>
    </div>

    <div class="form-group">
      <label>Km na rodovia`:</label>
      <input name="c3" v-model="kmRodovia" placeholder="Digite a quantidade de quilômetros a rodar na rodovia" @keyup="validar($event, false)" class="input-field" maxlength="4"/>
    </div>

    <div class="button-group">
      <Button label="Consultar" icon="pi pi-search" class="btn-primary" @click="consultar" />
    </div>

    <DataTable :value="resultado" responsiveLayout="scroll" class="resultado-table mt-4" style="width:60rem">
      <Column field="nome" header="Nome"></Column>
      <Column field="marca" header="Marca"></Column>
      <Column field="modelo" header="Modelo"></Column>
      <Column field="ano" header="Ano"></Column>
      <Column field="litrosGasto" header="Combustível gasto (L)" style="width:12rem;text-align:right" headerStyle="text-align:right">
        <template #body="slotProps">
          {{ slotProps.data.litrosGasto.toFixed(2) }}
        </template>
      </Column>
      <Column field="valorGasto" header="Valor total (R$)" style="width:9rem;text-align:right">
        <template #body="slotProps">
          {{ slotProps.data.valorGasto.toFixed(2) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConsultaApiService from "../services/ConsultaApiService";

export default {
  components: { Button, DataTable, Column },
  data() {
    return {
      preco: 6.69,
      kmCidade: 100,
      kmRodovia: 100,
      resultado: []
    };
  },

  mounted() {
    this.consultar();
    },

  methods: {
    validar(e,t) {
      var tecla = (window.event) ? event.keyCode : e.which;
      if ((tecla > 47 && tecla < 58)) { // 48-57 são códigos de tecla para 0-9
        return true;
      } else {
        var rep = t == true && e.key == "," || e.key == "." ? "." : ""
        if(e.srcElement.name=="c1") this.preco = this.preco.replace(e.key,rep);
        if(e.srcElement.name=="c2") this.kmCidade = this.kmCidade.replace(e.key,rep);
        if(e.srcElement.name=="c3") this.kmRodovia = this.kmRodovia.replace(e.key,rep);
      }
    },

    consultar() {
      this.resultado = [];
      ConsultaApiService.consultaApi(this.preco, this.kmCidade, this.kmRodovia)
          .then(response => {
            if (response.data != null) {
              this.resultado = response.data;
            } else {
              this.$toast.add({
                severity: "warn",
                summary: "Info",
                detail: response.data.mensagem,
                life: 5000
              });
            }
          })
          .catch(() => {
            this.$toast.add({
              severity: "error",
              summary: "Erro",
              detail: "Falha ao consultar os dados.",
              life: 5000
            });
          });
    }
  }
};
</script>

<style>
.consulta-container {
  background-color: #FFFFFF;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-size: 13px;
  overflow: hidden; /* garante que o cabeçalho siga o border-radius */
}

.header-bar {
  background-color: #2d70a6;
  color: #FFFFFF;
  padding: 0.2rem 0.4rem;
}

.header-title {
  background-color: #0a8aee;;
  color: #FFFFFF;
  padding: 0.5rem 0.4rem;
  font-size: 14px;
}

.header-bar h2 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.form-group {
  margin: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  color: #333333;
  margin-bottom: 0.3rem;
  font-weight: 500;
  font-size: 13px;
}

.input-field {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: 1px solid #CCCCCC;
  font-size: 13px;
  background-color: #F5F5F5;
  color: #333333;
}

.input-field:focus {
  outline: none;
  border-color: #0078D4;
  box-shadow: 0 0 3px #0078D4;
}

.button-group {
  margin: 1rem;
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background-color: #0078D4;
  color: #FFFFFF;
  border: none;
  font-size: 13px;
  padding: 0.5rem 1.2rem;
  border-radius: 50px; /* arredondado */
}

.btn-primary:hover {
  background-color: #005A9E;
}

.btn-secondary {
  background-color: #D32F2F;
  color: #FFFFFF;
  border: none;
  font-size: 13px;
  padding: 0.5rem 1.2rem;
  border-radius: 50px; /* arredondado */
}

.btn-secondary:hover {
  background-color: #B71C1C;
}

.resultado-table {
  margin: 1rem;
}

.resultado-table .p-datatable-thead > tr > th {
  background-color: #F5F5F5;
  color: #333333;
  font-weight: 600;
  font-size: 14px;
}

.resultado-table .p-datatable-tbody > tr > td {
  color: #333333;
  font-size: 13px;
}

.resultado-table .p-datatable-tbody > tr:nth-child(even) {
  background: #fafafa;
}

.resultado-table .p-datatable-tbody > tr:hover {
  background: #e6f2fb;
  cursor: pointer;
}
</style>
