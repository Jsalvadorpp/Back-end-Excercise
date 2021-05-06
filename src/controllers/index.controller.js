exports.welcome = async (req, res) => {
	res.send('welcome');
};

exports.users = async (req, res) => {
	res.send({ users: [ 'user1', 'user2' ] });
};
