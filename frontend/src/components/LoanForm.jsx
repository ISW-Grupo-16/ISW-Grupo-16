// loanform.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';

export default function LoanForm({ setCuota }) {
  const [formData, setFormData] = useState({
    valorCredito: '',
    tasa: '',
    plazo: '',
    cuotaUF: '0',
    totalUF: '0',
    cuotaClp: '0',
    totalClp: '0',
  });

  const [valorUF, setValorUF] = useState('');

  useEffect(() => {
    axios
      .get("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=599cd22316598c0ec9fc843e23b2cdcc077159ba&formato=JSON")
      .then(res => {
        const data = res.data;
        setValorUF(parseFloat(data.UFs[0].Valor));
      })
      .catch(error => {
        console.error("Error conectando con api UF:", error);
      });
  }, []);

  useEffect(() => {
    console.log('Cuota actualizada:', formData.cuotaUF);
  }, [formData.cuotaUF]);


  const calcularCuota = (tasa, plazo, valor) => {
    var tasa = parseFloat(tasa / 100);
    const cuota = ((valor * tasa) / (1 - Math.pow((1 + tasa), -plazo))).toFixed(2);
    return cuota;
  };


  const calcularUFTotal = (cuota, plazo) =>{
    const totalUF = (cuota * plazo).toFixed(2);
    return totalUF;
  };

  const conversionCuotaCLP = (cuota, valorUF) =>{
    const cuotaCLP = (cuota * valorUF).toFixed(0);
    return cuotaCLP;
  };

  const conversionTotalCLP = (totalUF, valorUF) =>{
    const totalCLP = (totalUF * valorUF).toFixed(0);
    return totalCLP;
  };


  const imprimirCalculo = (event) => {
    event.preventDefault();
    const cuotaUF = calcularCuota(formData.tasa, formData.plazo, formData.valorCredito);
    const totalUF = calcularUFTotal(cuotaUF, formData.plazo);
    const cuotaCLP = conversionCuotaCLP(cuotaUF, valorUF);
    const totalCLP = conversionTotalCLP(totalUF, valorUF);

    setFormData({ ...formData, cuotaUF: cuotaUF, totalUF: totalUF, cuotaClp: cuotaCLP, totalClp: totalCLP});
    // setFormData({ ...formData, totalUF: totalUF});
    setCuota(cuotaUF);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={imprimirCalculo}>
          <h2 className="text-center">Simulaciones:</h2>
          <InputField
            label="Valor del crédito"
            id="valorCredito"
            name="valorCredito"
            value={formData.valorCredito}
            onChange={handleInputChange}
          />
          <InputField
            label="Tasa de préstamo"
            id="tasa"
            name="tasa"
            value={formData.tasa}
            onChange={handleInputChange}
          />
          <InputField
            label="Plazo de préstamo"
            id="plazo"
            name="plazo"
            value={formData.plazo}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Calcular
          </button>
        </form>
        <div>Valor UF hoy: {valorUF} CLP</div>
        <div>Sus cuotas serían de: {formData.cuotaUF} UF</div>
        <div>Total: {formData.totalUF} UF</div>
        <div>Sus cuotas serían de: {formData.cuotaClp} CLP</div>
        <div>Total: {formData.totalClp} CLP</div>
      </div>
    </div>
  );
}
