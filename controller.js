import User from "./model.js"

const getLeaderboard = async (req, res) => {
    // get all user and sort by score
    const users = await User.find().sort({score: -1});
    return res.status(200).json(users);
};

const checkUserExist = async (req, res) => {
    const name = req.params.name;
    // find user by name attribute
    const user = await User.findOne({name: name});

    if(!user){
        return res.status(200).json({status: true, message: "This is username is available"});
    }

    return res.status(200).json({status: false, message: "This is username is not available"});
}

const updateUserScore = async (req, res) => {
    const name = req.params.name;
    const { score } = req.body;
    const user = await User.findOne({name: name});

    if(!user){
        const newUser = new User({name: name, score: score});
        await newUser.save();
        return res.status(201).json(newUser);
    }

    user.score = score;
    await user.save();
    return res.status(200).json(user);
}

export { getLeaderboard, checkUserExist, updateUserScore };