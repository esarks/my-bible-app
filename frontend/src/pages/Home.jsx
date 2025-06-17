import ViewerShell from '../viewers/ViewerShell';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Bible App</h1>
      <ViewerShell />
    </div>
  );
}
