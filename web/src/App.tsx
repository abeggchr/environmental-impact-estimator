import './App.css'
import useCopyToClipboard from "./util/useCopyToClipboard";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {FunctionComponent} from "react";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Baseline />
        </QueryClientProvider>
    )
}

const Baseline:FunctionComponent = () => {
    const [, copy] = useCopyToClipboard();

    const baselineQuery = useQuery('baseline', getBaseline);

    async function getBaseline(): Promise<string> {
        const result = await fetch("http://localhost:3000/baseline");
        return await result.text();
    }

    return (
    <div className="App">
        <h1 onClick={() => copy(baselineQuery.data?.toString() || '')}>Baseline</h1>
        <p>{baselineQuery.data?.toString()}</p>
    </div>);
}

export default App
