import { useState } from "react";

const AuthPlugin = ({right,left,top}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2,setPassword2] = useState("");
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    const url = isRegister ? "http://localhost:3000/register" : "http://localhost:3000/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log(isRegister ? "Registration successful" : "Login successful", data);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div 
    style={{
        top: top ? `${top}px` : "auto",
        right: right ? `${right}px` : "auto",
        left: left ? `${left}px` : "auto",
      }}
    
    className={`fixed flex flex-col items-center justify-center`}>
      {!isVisible ? (
        <button
          className="bg-pink-cool font-poppins uppercase shadow-lg px-4 py-2 rounded-lg hover:bg-purple-cool hover:text-white"
          onClick={() => setIsVisible(true)}
        >
          Login / Register
        </button>
      ) : (
        <div className="relative p-6 bg-white shadow-lg font-poppins rounded-lg w-96">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-pink-cool font-sigmar text-2xl hover:text-purple-cool cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            ✖
          </button>
          <h2 className="text-2xl font-semibold font-sigmar uppercase text-center">
            {isRegister ? "Register" : "Login"}
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleAuth} className="flex flex-col gap-4 mt-4 mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            {isRegister ?
                    <input
                    type="password"
                    placeholder="Repeat Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                    required
                /> :
                 "" 
            }
            <button
              type="submit"
              className="bg-pink-cool pl-4 pr-4 pt-2 pb-2 rounded-lg hover:bg-purple-cool hover:text-white"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="cursor-pointer mt-4 uppercase text-purple-cool w-full text-center pointer hover:shadow-sm active:shadow-none"
          >
            {isRegister ? "Back to Login" : "Register"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPlugin;
