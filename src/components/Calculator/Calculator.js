import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [level1Clients, setLevel1Clients] = useState(15);
  const [level2Clients, setLevel2Clients] = useState(0);
  const [level3Clients, setLevel3Clients] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(10);
  const [commission, setCommission] = useState(3);
  const [result, setResult] = useState(0);
  const [clientsAttracted, setClientsAttracted] = useState(15);
  const [dailyOrdersPerClient, setDailyOrdersPerClient] = useState(10);
  const [agentResult, setAgentResult] = useState(0);
  const [agentCommission, setAgentCommission] = useState(3);
  const [stpClientsAttracted, setStpClientsAttracted] = useState(15);
  const [stpDailyOrdersPerClient, setStpDailyOrdersPerClient] = useState(10);
  const [proStpResult, setProStpResult] = useState(0);
  const [partnerReward, setPartnerReward] = useState(7);
  const [showSecondLevel, setShowSecondLevel] = useState(false);

  const agFormula = () => {
    const affiliateResult = parseInt(level1Clients * (10 * dailyOrders) + commission * level1Clients * dailyOrders + level2Clients * dailyOrders * 10 * 0.167 + level3Clients * dailyOrders * 10 * 0.056);
    const proStp = parseInt(partnerReward * stpClientsAttracted * stpDailyOrdersPerClient);
    const agentRes = parseInt(clientsAttracted * (15 * dailyOrdersPerClient) + agentCommission * clientsAttracted * dailyOrdersPerClient);
    
    setResult(affiliateResult);
    setProStpResult(proStp);
    setAgentResult(agentRes);
  };

  useEffect(() => {
    agFormula();
  }, [level1Clients, level2Clients, level3Clients, dailyOrders, commission, clientsAttracted, dailyOrdersPerClient, agentCommission, stpClientsAttracted, stpDailyOrdersPerClient, partnerReward]);

  return (
    <div className="ag-calculators-block">
      <div className="ag-format-container">
        <div id="agent" className="ag-calculator-block">
          <div className="ag-calculator_title">Rankings</div>
          <div className="js-calculator_input-wrap ag-calculator_input-wrap">
            <label className="ag-calculator_label" htmlFor="clients-attracted">National</label>
            <input id="clients-attracted" className="js-calculator_text-input ag-calculator_text-input" type="number" name="clients-attracted" min="0" max="100" value={clientsAttracted} onChange={e => setClientsAttracted(parseInt(e.target.value))} />
            <input className="js-calculator_range" step="1" type="range" name="clients-attracted" min="0" max="100" value={clientsAttracted} onChange={e => setClientsAttracted(parseInt(e.target.value))} />
          </div>
          <div className="js-calculator_input-wrap ag-calculator_input-wrap">
            <label className="ag-calculator_label" htmlFor="daily-orders-per-client">State</label>
            <input id="daily-orders-per-client" className="js-calculator_text-input ag-calculator_text-input" type="number" name="daily-orders-per-client" min="0" max="100" value={dailyOrdersPerClient} step="1" onChange={e => setDailyOrdersPerClient(parseInt(e.target.value))} />
            <input className="js-calculator_range" step="1" type="range" name="daily-orders-per-client" min="0" max="100" value={dailyOrdersPerClient} onChange={e => setDailyOrdersPerClient(parseInt(e.target.value))} />
          </div>
          <div className="js-calculator_input-wrap ag-calculator_input-wrap">
            <label className="ag-calculator_label" htmlFor="agent-commission">Country</label>
            <input id="agent-commission" className="js-calculator_text-input ag-calculator_text-input" type="number" name="agent-commission" min="0" max="8" value={agentCommission} step="0.5" onChange={e => setAgentCommission(parseFloat(e.target.value))} />
            <input className="js-calculator_range" step="0.5" type="range" name="agent-commission" min="0" max="8" value={agentCommission} onChange={e => setAgentCommission(parseFloat(e.target.value))} />
          </div>
        </div>

        <div id="prostpmarkup" className="ag-calculator-block">
          <div className="ag-calculator_title">Subject wise Proficiency</div>
          {/* <div className="js-calculator_input-wrap ag-calculator_input-wrap">
            <span className="ag-calculator_label">Level of partner reward</span>
            <div className="js-calculator_radio-box ag-calculator_radio-box">
              {[7, 15, 30, 40, 50].map(value => (
                <React.Fragment key={value}>
                  <input id={`price${value}`} className="js-calculator_radio" type="radio" name="partner-reward" value={value} checked={partnerReward === value} onChange={e => setPartnerReward(parseInt(e.target.value))} />
                  <label className="ag-calculator_radio-label" htmlFor={`price${value}`}>{`${value}$`}</label>
                </React.Fragment>
              ))}
            </div>
          </div> */}
          <div className="js-calculator_input-wrap ag-calculator_input-wrap">
            <label className="ag-calculator_label" htmlFor="stp-clients-attracted">Mathmatics</label>
            <input id="stp-clients-attracted" className="js-calculator_text-input ag-calculator_text-input" type="number" name="stp-clients-attracted" min="0" max="100" value={stpClientsAttracted} onChange={e => setStpClientsAttracted(parseInt(e.target.value))} />
            <input className="js-calculator_range" step="1" type="range" name="stp-clients-attracted" min="0" max="100" value={stpClientsAttracted} onChange={e => setStpClientsAttracted(parseInt(e.target.value))} />
          </div>
          <div className="js-calculator_input-wrap ag-calculator_input-wrap">
            <label className="ag-calculator_label" htmlFor="stp-daily-orders-per-client">English</label>
            <input id="stp-daily-orders-per-client" className="js-calculator_text-input ag-calculator_text-input" type="number" name="stp-daily-orders-per-client" min="0" max="100" value={stpDailyOrdersPerClient} step="1" onChange={e => setStpDailyOrdersPerClient(parseInt(e.target.value))} />
            <input className="js-calculator_range" step="1" type="range" name="stp-daily-orders-per-client" min="0" max="100" value={stpDailyOrdersPerClient} onChange={e => setStpDailyOrdersPerClient(parseInt(e.target.value))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
