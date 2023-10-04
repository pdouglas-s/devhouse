import * as Yup from 'yup';
import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha no email. ' });
    }

    // verifica se usuário já existe, caso existir não vai cadastrar.
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }
    return res.json(user);
  }
}

export default new SessionControler();
