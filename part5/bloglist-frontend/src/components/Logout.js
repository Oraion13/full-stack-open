const Logout = ({ userName, setUser, setErrorMessage }) => {
  const handleLogout = (event) => {
    event.preventDefault();

    if (window.confirm(`Are you sure to logout ? ${userName}`)) {

      window.localStorage.removeItem("loggedBlogUser");
      setUser(null);

      setErrorMessage(`successfully logged out ${userName}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Logout;
