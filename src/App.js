import { useState } from "react";
import "./App.css";
import MortgageCalculator from "./components/MortgageCalculator";
import EmailForm from "./components/EmailForm";

function App() {
  // EmailForm
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  //
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //MortgageCalc
  const [propertyBuyingPrice, setPropertyBuyingPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [termLength, setTermLength] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  return (
    <>
      <div className='container'>
        <MortgageCalculator
          propertyBuyingPrice={propertyBuyingPrice}
          setPropertyBuyingPrice={setPropertyBuyingPrice}
          downPayment={downPayment}
          setDownPayment={setDownPayment}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          termLength={termLength}
          setTermLength={setTermLength}
          monthlyPayment={monthlyPayment}
          setMonthlyPayment={setMonthlyPayment}
          name={name}
          setSubject={setSubject}
          setMessage={setMessage}
        />
        <EmailForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          subject={subject}
          setSubject={setSubject}
          message={message}
          setMessage={setMessage}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          success={success}
          setSuccess={setSuccess}
        />
      </div>
    </>
  );
}

export default App;
