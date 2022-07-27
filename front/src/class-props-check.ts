if (!new class { x: any }().hasOwnProperty('x')) {
    throw new Error('Transpiler is not configured correctly');
}
