import { BrowserRouter } from 'react-router-dom';
import InitModalComponents from './InitModalComponents';
import { useRoutes } from './routs';

function App() {

	const route = useRoutes()

	return (
		<div className="App">
			<InitModalComponents/>
			<BrowserRouter>
				{route}
			</BrowserRouter>
		</div>
	)
}

export default App
