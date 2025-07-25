import { Link, useNavigate } from "react-router";

export const UserPage = () => {
  const nav = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "aaa");
    nav("/");
  };

  return (
    <div className="">
      <div className="">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />
      </div>
      <div className="">
        <table>
          <thead>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </thead>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>
                <Link to="/user/1">Centro comercial Moctezuma</Link>
              </td>
            </tr>
            <tr>
              <td>Germany</td>
              <td>Mexico</td>
              <td>
                <Link to="/user/2">Francisco Chang</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
