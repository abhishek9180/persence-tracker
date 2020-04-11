class ResponseModel {
    constructor(options) {
        this.code = options.code || 0;
        this.type = options.type || '';
        this.message = options.message || '';
        this.data = options.data || {};
    }
}

module.exports = ResponseModel;
