
import React, { useState } from 'react';
import LoanForm from '../../components/LoanForm';
import PersonalInfoForm from '../../components/PersonalInfoForm';

export default function LoanCalculatorView() {
  const [formData, setFormData] = useState({
    valorCredito: '',
    tasa: '',
    plazo: '',
    cuotaUF: '0',
    totalUF: '0',
    cuotaClp: '0',
    totalClp: '0',
  });
  const [cuota, setCuota] = useState('');
  return (
    <div>
      <div className="container">
        <h2 className="text-center">Préstamos</h2>
        <div className="row">
          <div className="col-md-6">
            <LoanForm formData={formData} setFormData={setFormData} setCuota={setCuota} />
          </div>
          <div className="col-md-6">
            <PersonalInfoForm formData={formData} setFormData={setFormData}cuota={cuota} setCuota={setCuota} />
          </div>
        </div>
      </div>
    </div>
  );
}
