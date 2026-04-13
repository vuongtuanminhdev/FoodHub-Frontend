const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async () => {
  try {
    await register({ email, password });
    alert("Register success");
    navigate("/login");
  } catch {
    alert("Register failed");
  }
};
