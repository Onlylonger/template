import { Button } from "@/components/button";
import { useRef, useState } from "react";
import { Link } from "react-router";

const mockList = [
  {
    id: "1",
    company: "Germany",
    contact: "Mexico",
    country: "Francisco Chang",
  },
  {
    id: "2",
    company: "UK",
    contact: "MM",
    country: "LonDon",
  },
];

export const UserPage = () => {
  const [list, setList] = useState(mockList);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    const val = ref.current?.value;
    if (val) {
      const filterList = mockList.filter((v) => {
        return v.company.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      setList(filterList);
    } else {
      setList(mockList);
    }
  };

  return (
    <div className="px-2">
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            ref={ref}
            className="rounded-md border border-black px-2"
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="text-right">
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => {
              return (
                <tr key={v.id}>
                  <td>{v.company}</td>
                  <td>{v.contact}</td>
                  <td>
                    <Link to={`/user/${v.id}`}>{v.country}</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
