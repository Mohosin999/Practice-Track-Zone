import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 350px;
  margin: 2rem auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ffc600;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  font-weight: 700;
  font-size: 1rem;
  color: red;
  margin-top: 0;
`;

const Button = styled.button`
  padding: 0.8rem;
  border: 1px solid #ffc600;
  display: block;
  width: 30%;
  border-radius: 5px;
  background-color: #ffc600;
  cursor: pointer;
  &:hover {
    background-color: transparent;
  }
`;

const LoginForm = ({ loginInfo, onChange, onSubmit, error }) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="username">Email or username</Label>
        <Input
          type={"text"}
          value={loginInfo && loginInfo.username}
          onChange={onChange}
          id={"username"}
          name={"username"}
          placeholder={"Enter your email or username"}
        />
        {error && <ErrorMessage>Invalid username or email</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type={"password"}
          value={loginInfo && loginInfo.password}
          onChange={onChange}
          id={"password"}
          name={"password"}
          placeholder={"Enter your password"}
        />
        {error && <ErrorMessage>Invalid Password</ErrorMessage>}
      </FormGroup>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
