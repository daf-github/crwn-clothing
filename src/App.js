import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';
 

const Shop = () => {
	return <h1>I am the shop page!!</h1>;
};

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='sign-in' element={<SignIn />} />
				<Route path='sign-up' element={<SignUpForm/>} />
				 
			</Route>
		</Routes>
	);
};

export default App;
