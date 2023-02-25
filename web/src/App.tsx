import './App.css'
import useCopyToClipboard from "./util/useCopyToClipboard";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {FunctionComponent} from "react";
import {Impact} from "./Impact";

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

    async function getBaseline(): Promise<Impact> {
        const result = await fetch("http://localhost:3000");
        return await result.json() as Impact;
    }

    return (
    <div className="App">
        <h1 onClick={() => copy(baselineQuery.data?.gC02eq.toString() || '')}>Baseline</h1>
        <p>{baselineQuery.data?.gC02eq}</p>
        <p>{baselineQuery.data?.toString()}</p>
    </div>);
}

export default App
