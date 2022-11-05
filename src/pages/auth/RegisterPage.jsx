import { Button, Card, Input, Loading, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { register } = useApi();
  const { user } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    return await register({
      username: username,
      email: email,
      password: password,
      password2: password2,
      first_name: firstName,
      last_name: lastName,
    })
      .then((res) => navigate("/auth/login"))
      .catch((error) => setError(error.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Card css={{ mw: "400px" }} isHoverable>
      <Card.Header>
        <Text h1 className="text-center">
          Sign up
        </Text>
      </Card.Header>
      <Card.Body>
        <Input
          clearable
          label="Fist name"
          placeholder="John"
          shadow={false}
          size="lg"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError();
          }}
          status={error && "error"}
        />
        <Input
          clearable
          label="Last name"
          placeholder="Doe"
          shadow={false}
          size="lg"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setError();
          }}
          status={error && "error"}
        />
        <Input
          clearable
          label="Username"
          placeholder="@username"
          shadow={false}
          size="lg"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError();
          }}
          status={error && "error"}
        />
        <Input
          clearable
          label="Email"
          placeholder="sample@mail.com"
          shadow={false}
          size="lg"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError();
          }}
          status={error && "error"}
        />
        <Input
          clearable
          label="Password"
          placeholder="Password"
          type="password"
          shadow={false}
          size="lg"
          value={password}
          onChange={(e) => {
            setPassword1(e.target.value);
            setError();
          }}
          status={error && "error"}
        />
        <Input
          clearable
          label="Confirm Password"
          placeholder="Password"
          type="password"
          shadow={false}
          size="lg"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
            setError();
          }}
          status={error && "error"}
        />
        <Spacer y={0.5} />
        {error &&
          Object.keys(error).map((key) => (
            <span key={key}>
              <Text color="error" key={key} className="text-center">
                {key}: {error[key].toString()}
              </Text>
              <Spacer y={0.5} />
            </span>
          ))}
        <Button size="lg" color="success" flat onPress={handleSubmit} disabled={loading}>
          {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Create account"}
        </Button>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Link to={"/auth/login"} className="text-center">
          Already have an account?
        </Link>
      </Card.Footer>
    </Card>
  );
}
