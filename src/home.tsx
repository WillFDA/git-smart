import { useState } from "react";

export default function App() {
  const [state, setState] = useState(1);
  if (!state) throw new Error("Super error");

  return <div>Hello world</div>;
}
