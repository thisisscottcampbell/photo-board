import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import PhotoList from './components/PhotoList';
import AddPhoto from './components/AddPhoto';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import simulateFetch from './util/simulateFetch';
import dummyPosts from './util/posts';

const App = ({ history }) => {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState(false);

	const removePhoto = ({ id }) => {
		const newList = posts.filter((post) => post.id !== id);

		setPosts(newList);
	};

	const addPhoto = (post) => {
		dummyPosts.push(post);
		setNewPost(true);
	};

	//cdm ue
	useEffect(() => setPosts(simulateFetch()), []);

	//new post ue
	useEffect(() => {
		if (!newPost) return;

		setPosts(simulateFetch());
		setNewPost(false);
	}, [newPost]);

	//list was updated ue
	useEffect(() => history.push('/'), [posts]);

	return (
		<BrowserRouter>
			<Route
				path="/"
				exact
				render={() => (
					<div>
						<Title title={'Photowall'} />
						<PhotoList removePhoto={removePhoto} posts={posts} />
					</div>
				)}
			/>
			<Route
				path="/AddPhoto"
				exaxct
				render={(props) => <AddPhoto addPhoto={addPhoto} {...props} />}
			/>
		</BrowserRouter>
	);
};

export default withRouter(App);
