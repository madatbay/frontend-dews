import { Button, Card, Input, Loading, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../axios";
import { useAuth } from "../../useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { login, user } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    return await API.post("/user/token/", { username, password })
      .then((res) => login(res.data))
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
          Sign in
        </Text>
      </Card.Header>
      <Card.Body>
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
          label="Password"
          placeholder="Password"
          type="password"
          shadow={false}
          size="lg"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
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
          {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Sign in"}
        </Button>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Link to={"/auth/register"} className="text-center">
          Don't you have an account?
        </Link>
      </Card.Footer>
    </Card>
  );
}
