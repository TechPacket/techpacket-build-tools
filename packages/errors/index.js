module.exports = class BaseError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'BaseError';
    }
};
