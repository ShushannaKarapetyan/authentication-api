class CustomError extends Error {
    constructor(props) {
        super();
        const {status, message} = props;

        this.status = status;
        this.message = message;
    }
}

module.exports = CustomError;
