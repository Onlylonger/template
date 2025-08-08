import { Button } from "@shilong/react";
import { getUserList } from "@/utils/api";
import { useRequest } from "@/utils/useRequest";
import { useRef, useState } from "react";
import { Link } from "react-router";

export const UserPage = () => {
  const [list, setList] = useState([]);
  const ref = useRef<HTMLInputElement | null>(null);

  const {
    data: res,
    loading,
    error,
  } = useRequest(getUserList, {
    onSuccess(res) {
      setList(res?.data?.records);
    },
  });

  console.log(error);

  const records = res?.data?.records ?? [];

  const handleSearch = () => {
    const val = ref.current?.value;
    if (val) {
      const filterList = records.filter((v) => {
        return v.userName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      setList(filterList);
    } else {
      setList(records);
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
          <Button onClick={handleSearch} size="sm">
            Search
          </Button>
          <Button onClick={handleSearch} size="lg">
            Search
          </Button>
        </div>
      </div>
      <div className="">
        {loading ? (
          "loading...."
        ) : (
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
                    <td>{v.userName}</td>
                    <td>{v.userName}</td>
                    <td>
                      <Link to={`/user/${v.id}`}>{v.userName}</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
