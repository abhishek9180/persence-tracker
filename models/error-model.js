class ErrorModel {
    constructor(options) {
        this.code = options.code || 0;
        this.type = options.type || '';
        this.message = options.message || '';
        this.description = options.description || '';
    }
}

module.exports = ErrorModel;