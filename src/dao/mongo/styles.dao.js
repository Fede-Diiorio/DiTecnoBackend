const { Styles } = require('./models');

class StylesDao {
    async getStyles() {
        return await Styles.find();
    };
};

module.exports = { StylesDao };
