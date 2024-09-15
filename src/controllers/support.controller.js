import SupportRepository from "../repository/support.repository.js";

export default class Controller {

    #supportRepository;

    constructor() {
        this.#supportRepository = new SupportRepository();
    };

    reportError(req, res) {
        try {
            const { error } = req.body;
            const answer = this.#supportRepository.sendSupportMail(error);

            res.json(answer);

        } catch (error) {
            res.status(error.status || 500).json(error);
        };
    };
};