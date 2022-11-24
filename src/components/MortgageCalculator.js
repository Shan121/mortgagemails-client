import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const MortgageCalculator = ({
  propertyBuyingPrice,
  setPropertyBuyingPrice,
  downPayment,
  setDownPayment,
  interestRate,
  setInterestRate,
  termLength,
  setTermLength,
  monthlyPayment,
  setMonthlyPayment,
  //
  name,
  setSubject,
  setMessage,
}) => {
  const amountToBorrow = propertyBuyingPrice - parseInt(downPayment || 0);

  const handleMortgageCalc = (e) => {
    e.preventDefault();

    let payment =
      ((interestRate / 100 / 12) * amountToBorrow) /
      (1 - Math.pow(1 + interestRate / 100 / 12, (0 - termLength) * 12));

    setMonthlyPayment(payment);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setPropertyBuyingPrice(0);
    setDownPayment(0);
    setInterestRate(0);
    setTermLength(0);
    setMonthlyPayment(0);
  };

  useEffect(() => {
    if (monthlyPayment && monthlyPayment !== "") {
      setSubject("Mortgage Payment");
      setMessage(
        `Hello ${
          name ? name + " " : ""
        }your monthly mortgage payment is ${parseInt(monthlyPayment)}`
      );
    }
  }, [monthlyPayment, name]);
  return (
    <div>
      <h1>Mortgage Calculator</h1>
      <form onSubmit={handleMortgageCalc} className='mt-4'>
        <Row className='my-2'>
          <Form.Group as={Col} md={3}>
            <Form.Label>Property Buying Price</Form.Label>
            <Form.Control
              type='number'
              value={propertyBuyingPrice}
              onChange={(e) => setPropertyBuyingPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={3}>
            <Form.Label>Down Payment</Form.Label>
            <Form.Control
              type='number'
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={3}>
            <Form.Label>Interest rate (%)</Form.Label>
            <Form.Control
              type='number'
              step='0.1'
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={3}>
            <Form.Label>Term Length (Year)</Form.Label>
            <Form.Control
              type='number'
              value={termLength}
              onChange={(e) => setTermLength(e.target.value)}
            />
          </Form.Group>
        </Row>
        <div className='my-3 d-flex justify-content-center align-items-center'>
          <Button variant='primary' className='mx-2' type='submit'>
            Calculate
          </Button>
          <Button variant='danger' className='mx-2' onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='my-2'>Monthly Payment</div>
        <h2>{parseInt(monthlyPayment)}</h2>
      </div>
    </div>
  );
};

export default MortgageCalculator;
