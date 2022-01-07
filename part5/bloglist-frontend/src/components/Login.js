const Login = (props) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <label htmlFor="user">Username</label>
        <input
          type="text"
          id="user"
          value={props.userName}
          onChange={props.addUserName}
          name="Username"
          required
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          value={props.password}
          onChange={props.addPassword}
          name="Password"
          required
        />
        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default Login;
