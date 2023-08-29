import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    store_name: "",
    code_store: "",
  });
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate("/login");
        console.log(responseData.message);
      } else {
        console.log("Registrasi gagal");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const navigate = useNavigate();
  const [account, setAccount] = useOutletContext();

  if (account) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const response = await fetch(
                              "http://localhost:3000/api/login",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(login),
                              }
                            );
                            if (response.ok) {
                              const auth = await response.json();
                              localStorage.setItem("token", auth.token);
                              setAccount(auth.account);
                              navigate("/");
                            } else {
                              const message = await response.text();
                              alert(message);
                            }
                          }}
                          className="section text-center"
                        >
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Username"
                              required
                              autoFocus
                              onChange={(e) =>
                                setLogin({ ...login, username: e.target.value })
                              }
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              placeholder="Password"
                              required
                              onChange={(e) =>
                                setLogin({ ...login, password: e.target.value })
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit">Login</button>
                          <p className="mb-0 mt-4 text-center">
                            <a
                              href="https://www.web-leb.com/code"
                              className="link"
                            >
                              Forgot your password?
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <form
                          onSubmit={handleSubmit}
                          className="section text-center"
                        >
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="username"
                              placeholder="username"
                              value={formData.username}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              placeholder="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-phone"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="store_name"
                              placeholder="store name"
                              value={formData.store_name}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="code_store"
                              placeholder="code store"
                              value={formData.code_store}
                              onChange={handleChange}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button className="btn mt-4" type="submit">
                            Register
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
