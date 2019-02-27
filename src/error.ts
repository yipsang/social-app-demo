export function parseError(_e: Error) {
    // since there is no known error structure
    // return unknown error for any error this stage
    return new Error("Unknown Error!");
}
