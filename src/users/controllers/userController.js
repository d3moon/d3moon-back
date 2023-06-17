const userService = require('../services/userService');
const { v4: uuidv4 } = require('uuid');

const createUser = async (req, res) => {
  try {
    const {
      fullname,
      nickname, 
      profile_picker,
    } = req.body

    const user = {
      id: uuidv4(),
      fullname,
      nickname,
      profile_picker,
    }
    await userService.createUser(user);
    return res.status(201).json({message: 'Usuário criado com sucesso!'});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário!', error });
  }
};

const signContent = async (req, res) => {
  try {
    const { id, nameContent } = req.body
    const { userId } = req.params
    const result = await userService.signContent(id, userId, nameContent);
    if(!result) {
      return res.status(404).json({message: 'Content não encontrado'})
    }
    return res.status(201).json({ message: 'Content assinado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao assinar content!', error });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }
    const result = {
      fullname: user.fullname,
      nickname: user.nickname,
      profile_picker: user.profile_picker,
      access_code: user.access_code,
      progress: user.progress,
      badges: user.badges
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário!', error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    
    const result = users.map((user) => {
      return {
        fullname: user.fullname,
        nickname: user.nickname,
        profile_picker: user.profile_picker,
        access_code: user.access_code,
        progress: user.progress,
        badges: user.badges
      }
    })

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário!', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const {
      fullname,
      nickname,
      profile_picker,
    } = req.body

    const user = await userService.updateUser(id, { fullname, nickname, profile_picker});

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    return res.status(200).json({message: 'Usuário Atualizado!'});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário!', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const {
      fullname,
      nickname,
      profile_picker,
    } = req.body

    const user = await userService.deleteUser(id, { fullname, nickname, profile_picker });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    return res.status(200).json({message: 'Usuário Deletado!'});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário!', error });
  }
};


module.exports = {
  createUser,
  signContent,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
};
