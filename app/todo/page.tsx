
const Page = async () => {
  // Server-side fetch
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    cache: 'no-store', 
  });
  const data = await response.json();

  return (
    <div>
      <h1>Todo Item</h1>
      <ul>
        <li>ID: {data.id}</li>
        <li>Title: {data.title}</li>
        <li>Completed: {data.completed ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
};

export default Page;
