type Userinfo = {
  id: number;
  firstName: string;
  lastName: string;
};
export default async function Page() {
  const res = await fetch("https://dummyjson.com/users/1");
  const data: Userinfo = await res.json();
  return (
    <>
      <h1>{data.id}</h1>
    </>
  );
}
