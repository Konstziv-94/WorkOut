class ExpressError extends Error {
    constructor (message,statuCode) {
        super();
        this.message = message;
        this.statuCode = statuCode;
    }
}

module.exports = ExpressError;