import axios from "axios";

// URL do backend
const API_URL = "http://ec2-18-189-170-202.us-east-2.compute.amazonaws.com:8080/veiculos/previsao";
//const API_URL = "http://localhost:8080/veiculos/previsao"

export default {
  consultaApi(par1, par2, par3) {
    return axios.post(`${API_URL}`, { precoGasolina: par1, kmCidade: par2, kmRodovia: par3 }, { headers:{'Content-Type': 'application/json'}});
  }
};
