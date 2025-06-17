import ViewerShell from '../viewers/ViewerShell';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Bible App</h1>
      <ViewerShell />
    </div>
  );
}