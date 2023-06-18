const badgeService = require('../services/badgeService.js')

const listBadges = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await badgeService.listBadges(userId);

    if (!result) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar badges' });
  }
};

module.exports = {
  listBadges
};
