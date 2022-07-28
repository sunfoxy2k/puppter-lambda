
exports.main = async (event, context) => {

    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                event
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
