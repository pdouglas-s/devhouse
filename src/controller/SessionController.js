import User from '../models/User';

class SessionControler{
    
    async store(req, res){

        const { email } = req.body;

        //verifica se usuário já existe, caso existir não vai cadastrar.
        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }
        return res.json(user);
    }
}

export default new SessionControler();