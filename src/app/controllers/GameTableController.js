import User from '../models/User';
import GameTable from '../schemas/GameTabel';
function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
12345
16302
class GameTableController {
    async check(req, res) {
        const { selectedNumbers } = req.body;
        const table = await await GameTable.findById(req.query.id);
        var onze = 0, doze = 0, treze = 0, quatoze = 0, quinze = 0;
        table.games.forEach(game => {
            let igual = 0;
            JSON.parse(game).forEach(e => {
                selectedNumbers.forEach(n => {
                    if (e == n) {
                        igual++;
                    }
                })
            });
            if (igual == 11) {
                onze++;
            } else if (igual == 12) {
                doze++;
            } else if (igual == 13) {
                treze++;
            } else if (igual == 14) {
                quatoze++;
            } else if (igual == 15) {
                quinze++;
            }
        });
        const pontos = [onze, doze, treze, quatoze, quinze];
        const newGame = await table.update({
            gain: ((onze * 5) + (doze * 10) + (treze * 25) + (quatoze * 1300) + (quinze * 2000)),
            checked: true
        });
        return res.json({ pontos, size: table.games.length });
    }
    async index(req, res) {
        const GameTables = await GameTable.find({ user: req.userId }).limit(20).select(['_id', 'createdAt', 'games', 'gain', 'checked']).skip(parseInt((req.query.page) - 1) * 20).sort({
            createdAt: -1
        });
        const aLength = (await GameTable.count()) - 5;
        GameTables.forEach(e => {
            e.games = e.games.length;
        });
        return res.json({ GameTables, aLength });
    }
    async delete(req, res) {
        const gameTable = await GameTable.findByIdAndDelete(req.params.id);
        return res.json(gameTable);
    }
    async store(req, res) {
        const gameTable = await GameTable.create({
            games: req.body.games,
            user: req.userId
        });
        return res.json(gameTable);
    }
    async list(req, res) {
        const { games } = await GameTable.findById(req.query.id);
        return res.json({ array: paginate(games, 10, req.query.page), aLength: games.length });
    }
}
export default new GameTableController();