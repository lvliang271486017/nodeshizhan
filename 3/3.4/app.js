function fn1() {
    console.log('fn1');
    next();
}
function fn2() {
    console.log('fn2');
    next();
}
function fn3() {
    console.log('fn3');
    next();
}

var task = [fn1, fn2, fn3];

function next(err, res) {
    if (err) throw err;
    
    var currentTask = task.shift();
    if (currentTask) currentTask(res);
}

next()