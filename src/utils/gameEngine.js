let hw2Index = function (h, w, maxW) {
    return h * maxW + w;
};

let index2W = function (index, maxW) {
    return index % maxW;
};

let index2H = function (index, maxW) {
    return Math.floor(index / maxW);
};


let getAllNeibours = function (h, w, maxH, maxW) {
    let result = [];
    if (h > 0) {
        result.push(hw2Index(h - 1, w, maxW));
        if (w > 0) {
            result.push(hw2Index(h - 1, w - 1, maxW))
        }
    }


    if (h < maxH - 1) {
        result.push(hw2Index(h + 1, w, maxW));
        if (w < maxW - 1) {
            result.push(hw2Index(h + 1, w + 1, maxW))
        }
    }

    if (w > 0) {
        result.push(hw2Index(h, w - 1, maxW));
        if (h < maxH - 1) {
            result.push(hw2Index(h + 1, w - 1, maxW))
        }
    }

    if (w < maxW - 1) {
        result.push(hw2Index(h, w + 1, maxW));
        if (h > 0) {
            result.push(hw2Index(h - 1, w + 1, maxW))
        }
    }
    return result;
};

let isActiveNow = function (h, w, state, seen) {
    const index = hw2Index(h, w, state.sizeW);
    if (seen.indexOf(index) > -1) {
        return false;
    }
    seen.push(index);
    if (state.field[index] === state.toMove) {
        return true;
    }
    if (state.field[index] === state.toMove * 2) {
        return getAllNeibours(h, w, state.sizeH, state.sizeW).map(
            (neibIndex) =>
                isActiveNow(index2H(neibIndex, state.sizeW), index2W(neibIndex, state.sizeW), state, seen)).some(
            (x) => x);
    }

    return false;
};

let isStepPossible =  function(cellState, toMove){
    if(cellState === 0){
        return true;
    }else{
        return (toMove ===  -cellState)
    }
};

const isStepValid = function (state, h, w) {
    if (!isStepPossible(state.field[hw2Index(h,w,state.sizeW)], state.toMove)){
        return  false;
    }

    const neibours = getAllNeibours(h, w, state.sizeH, state.sizeW);
    let seen = [];
    return neibours.map((neibIndex) =>
        isActiveNow(index2H(neibIndex, state.sizeW), index2W(neibIndex, state.sizeW), state, seen)).some(
            (x) => x);
};


const getNextState = function (currentState, toMove) {
    if (currentState === 0) {
        return toMove;
    } else {
        return -currentState + toMove
    }
};

const isValidMoveExists  = function (state) {
    let tmp_state = {...state};
    for(let i = 0; i<3; i++){
        let found = false;
        for(let k=0; k<tmp_state.sizeW*tmp_state.sizeH; k++){
            if (isStepValid(tmp_state, index2H(k, tmp_state.sizeW),index2W(k, tmp_state.sizeW))){
                found = true;
                let stepped_field = tmp_state.field.slice();
                stepped_field[k] = getNextState(stepped_field[k], tmp_state.toMove);
                tmp_state.field = stepped_field;
                break;
            }
        }
        if (!found){
            return false
        }
    }
    return true
};

export {isStepValid, getNextState, isValidMoveExists};

