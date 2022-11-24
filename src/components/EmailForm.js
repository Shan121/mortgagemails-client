import { useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

const EmailForm = ({
  name,
  setName,
  email,
  setEmail,
  subject,
  setSubject,
  message,
  setMessage,
  loading,
  setLoading,
  error,
  setError,
  success,
  setSuccess,
}) => {
  const handleEmail = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/send`,
        { name, email, subject, message },
        config
      );
      if (data) {
        console.log("Data ", data);
        setSuccess(data.message ? data.message : "Email was sent successfully");
      }
      setLoading(false);
    } catch (error) {
      setError(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message
          ? error.response.data.message
          : "Error! Try again later"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 5000);
    }

    if (success) {
      timeout = setTimeout(() => {
        setSuccess("");
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error, success]);

  return (
    <div className='mt-2'>
      <h1>Email</h1>
      {success && loading === false ? (
        <Alert variant='success'>{success}</Alert>
      ) : (
        ""
      )}
      {error && loading === false ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        ""
      )}
      <form onSubmit={handleEmail}>
        <Row className='my-2'>
          <Form.Group as={Col} md={4}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={4}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={4}>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type='text'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Row>
        <div className='my-3 d-flex justify-content-center align-items-center'>
          <Button
            variant='primary'
            className='mx-2'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              >
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
