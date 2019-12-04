
function resolveImagePath(state) {
    let path = "/img/";
    switch (state) {
        case 0: path += "empty.png"; break;
        case 1: path += "blueActive.png"; break;
        case 2: path += "blueBase.png"; break;
        case -1: path += "redActive.png"; break;
        case -2: path += "redBase.png"; break;
        default: path += "empty.png"; break;

    }
    return path;
}

export default resolveImagePath